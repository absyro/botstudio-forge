import rateLimit from 'express-rate-limit';
import responseTime from 'response-time';
import compression from 'compression';
import { WebSocketServer } from 'ws';
import crypto from 'node:crypto';
import express from 'express';
import Veloce from 'velocedb';
import path from 'node:path';
import helmet from 'helmet';
import chalk from 'chalk';
import cors from 'cors';

// Creating a new Express app to handle incoming requests to the server.
const app = express();

// Creating a new database instance using the Velocedb.
const database = new Veloce('database.json');

// Creating a new array of all websocket clients connected.
const wsc = {};

// Using the Cors middleware.
app.use(cors());

// Using the helmet middleware to secure the requests.
app.use(
    // Using the helmet middleware with custom configuration.
    helmet({
        // Configuring Content Security Policy directives.
        contentSecurityPolicy: {
            // Defining security directives.
            directives: {
                // Specifying the source from which to load resources by default (self).
                defaultSrc: ["'self'"],
                // Specifying the sources from which to allow WebSocket connections, including localhost on port 5030.
                connectSrc: ["'self'", 'ws://localhost:5030']
            }
        }
    })
);

// Using the response time middleware to get response times using request headers.
app.use(responseTime());

// Using express static to render static files from the public directory.
app.use(express.static('public'));

// Using the compression middleware from Express to optimize the requests.
app.use(compression());

// Using Express JSON to handle incmoing request bodies with a limitation of 1 MB.
app.use(express.json({ limit: '1mb' }));

// Using the Express rate limit middleware to limit the requests.
app.use(
    // The rate limit module is used here as a middleware.
    rateLimit({
        // Setting a limitation for 1 minute here.
        windowMs: 60000,
        // Setting a limitation of 100000 requests per minute.
        max: 100000,
        // The handler that will be triggered whenever a limitation exceeds.
        handler: (req, res) => res.status(429).send('Too many requests!')
    })
);

// A custom middleware to make sure all requests contain a body, making the requests secure.
app.use((req, res, next) => {
    // If a request body doesn't exist, set it to '{}'.
    req.body ||= {};

    // Continue to the next middleware.
    next();
});

// Handling incoming requests to get the list of all bots.
app.use('/api/fetch_bots', (req, res) => {
    // Sending a list of all bots in the database file. Some parameters will be removed.
    res.status(200).send(Object.values(database.data).map(({ webhook, updates, ...bot }) => bot));
});

// Handling incoming requests to get bot information from the database.
app.use('/api/fetch_bot', (req, res) => {
    // Finding the bot in the database and removing some parameters from it.
    const { webhook, updates, ...bot } = Object.values(database.data).find(({ id }) => id === req.body.id) || {};

    // Sending the bot's information as the response.
    res.status(Object.keys(bot).length ? 200 : 400).send(bot);
});

// A custom middleware to handle all incoming requests to the API endpoints.
app.use('/api', (req, res, next) => {
    // Extracting the hash parameter from the request body.
    const { hash } = req.body;

    // Check if the provided hash contains a minimum of 64 and a maximum of 512 characters.
    if (hash.length < 64 || hash.length > 512) return res.status(400).send('The hash length must be between 64 and 512 characters.');

    // Check if the provided hash only consists of A-Z, a-z, and 0-9 characters.
    if (!/^[a-zA-Z0-9]+$/.test(hash)) return res.status(400).send('The hash should only consist of A-Z, a-z, and 0-9 characters.');

    // If the provided hash doesn't exist in the database, create it.
    if (!database.data.hasOwnProperty(hash)) {
        // Creating the hash in the database.
        database.data[hash] = {
            // Creating a unique ID for the hash in the database.
            id: crypto.randomBytes(32).toString('hex'),
            // Setting a custom name for the bot.
            name: 'The bot',
            // Setting a custom description for the bot.
            description: 'The description of the bot.',
            // Creating a list of the bot's commands. An empty array that will contain strings.
            commands: [],
            // Creating the bot's update list. It will be an empty array of objects.
            updates: []
        };
    }

    // Continue to the next middleware.
    next();
});

// Checking if the request was sent to set the parameters of a bot.
app.use('/api/set_parameters', (req, res) => {
    // Extracting the parameters from the request body.
    const { hash, webhook, name, description } = req.body;

    // Check if a webhook address is provided and if it has a correct URL; if not, return and do nothing.
    if (webhook && !/^(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(webhook)) return res.status(400).send('The webhook address is not a valid URL.');

    // Checking if a name is provided and the provided name is a string with a minimum of 2 characters and a maximum of 25 characters.
    if (name && !(typeof name === 'string' && name.length < 25 && name.length > 2)) return res.status(400).send('The provided name must be a string with a minimum of 2 characters and a maximum of 25 characters.');

    // Checking if a description is provided and the provided description is a string with a minimum of 25 characters and a maximum of 250 characters.
    if (description && !(typeof description === 'string' && description.length < 250 && description.length > 25)) return res.status(400).send('The provided description must be a string with a minimum of 25 characters and a maximum of 250 characters.');

    // Setting the bot parameters based on the received parameters.
    Object.assign(database.data[hash], { webhook, name, description });

    // Saving the data to the database.
    database.save();

    // Sending a successful message as the response to the received request.
    res.status(200).send('The bot parameters have been changed successfully.');
});

// Handling incoming requests to get the bot's update list.
app.use('/api/get_updates', (req, res) => {
    // Extracting the bot hash from the request body.
    const { hash } = req.body;

    // Sending the response to the request with the bot's update list.
    res.status(200).send(database.data[hash].updates);
});

// Handling incoming requests to send a message to a client.
app.use('/api/send_message', (req, res) => {
    // Extracting the parameters from the request body.
    const { client, content } = req.body;

    // If the client doesn't exist, then return a status code of 400.
    if (!wsc.hasOwnProperty(client)) return res.status(400).send('The requested client is invalid.');

    // Send the message to the client.
    wsc[client].send(JSON.stringify({ type: 'text', content }));

    // Sending a message indicating a successful process.
    res.status(200).send('The message was delivered successfully.');
});

// Checking if the user has requested the home page.
app.use(/\//, (req, res) => {
    // Sending the home page.
    res.sendFile(path.join(process.cwd(), 'public', 'home', 'index.html'));
});

// Checking if the user has requested any other pages.
app.use((req, res, next) => {
    // Extracting the path from the request.
    const { path: p } = req;

    // Getting the requested page from the user request.
    const page = p.split('/')[1];

    // If the user is requesting a resource or an invalid page, then do nothing.
    if (p.split('.').length > 1 || !['bot'].includes(page)) return next();

    // Sending the requested page to the user.
    res.sendFile(path.join(process.cwd(), 'public', page, 'index.html'));
});

// Setting the trust proxy for the local network address. This one is used for express rate limit middleware.
app.set('trust proxy', '127.0.0.1');

// Running the app on port 5000 and creating a new log into the console.
app.listen(5000, () => console.log('> Running on:', chalk.cyan('http://localhost:5000')));

// After each server starts, remove the list of updates for the bot.
Object.keys(database.data).forEach((key) => (database.data[key].updates = []));

// Save the new data to the database.
database.save();

// Creating a new websocket server on port 5030.
const wss = new WebSocketServer({ port: 5030 });

// Listening for incoming connections.
wss.on('connection', (ws) => {
    // Creating a unique ID for the connected client.
    const clientID = crypto.randomBytes(32).toString('hex');

    // Listening for all incoming messages from the client.
    ws.on('message', (message) => {
        try {
            // Extracting the parameters from the received message.
            const { type, content, id } = JSON.parse(message.toString());

            // Finding the bot in the database.
            const bot = Object.values(database.data).find((bot) => bot.id === id) || {};

            // The parameters of the message are used to handle messages.
            const parameters = { type, content, client: clientID, date: new Date() };

            // Adding this update to the bot's updates list.
            bot.updates.push(parameters);

            // Check if the webhook address exists for this bot.
            if (bot.webhook) {
                // Sending a POST request to the bot webhook.
                fetch(bot.webhook, {
                    // Sending the request using the POST method.
                    method: 'POST',
                    // Setting the headers of the request.
                    headers: {
                        // Setting the request's content type to application/json.
                        'Content-Type': 'application/json'
                    },
                    // Stringyfing and sending the body of the request.
                    body: JSON.stringify(parameters)
                });
            }

            // Saving the data to the database.
            database.save();
        } catch {}
    });

    // Saving this client to the websocket client list.
    wsc[clientID] = ws;

    // Listening for a close event to remove the client from the client list when a client has been disconnected.
    ws.on('close', () => delete wsc[clientID]);
});
