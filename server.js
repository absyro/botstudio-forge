import rateLimit from 'express-rate-limit';
import responseTime from 'response-time';
import compression from 'compression';
import crypto from 'node:crypto';
import express from 'express';
import Veloce from 'velocedb';
import path from 'node:path';
import dotenv from 'dotenv';
import chalk from 'chalk';
import cors from 'cors';

// Using the 'dotenv' module to load .env files.
dotenv.config();

// Setting the PORT environment variables to '3090' if it doesn't exist.
process.env.PORT ||= '3090';

// Setting the NODE_ENV environment variables to 'production' if it doesn't exist.
process.env.NODE_ENV ||= 'production';

// Creating a new Express app to handle incoming requests to the server.
const app = express();

// Creating a new database instance using the Velocedb.
const database = new Veloce('database.json');

// Using the Cors middleware.
app.use(cors());

// Using the response time middleware to get response times using request headers.
app.use(responseTime());

// Using express static to render static files from the public directory.
app.use(express.static('public'));

// Using the compression middleware from Express to optimize the requests.
app.use(compression());

// Using Express JSON to handle incmoing request bodies with a limitation of 1 MB.
app.use(express.json({ limit: '1mb' }));

// Using the Express rate limit middleware to limit the requests from a client.
app.use(
    // The rate limit module is used here as a middleware.
    rateLimit({
        // Setting a limitation for 1 minute here.
        windowMs: 60000,
        // Setting a limitation of 100 requests per minute.
        max: 100,
        // The handler that will be triggered whenever a limitation exceeds.
        handler: (req, res) => res.status(429).send('Too many requests!')
    })
);

// A custom middleware to make sure all requests contain a body.
app.use((req, res, next) => {
    // If a request body doesn't exist, set it to '{}'.
    req.body ||= {};

    // Continue to the next middleware.
    next();
});

// Handling incoming requests to get the list of all bots.
app.use('/api/fetch_bots', (req, res) => {
    // Sending a list of all bots in the database file.
    res.status(200).send(Object.values(database.data));
});

// A custom middleware to handle all incoming requests to the API endpoints.
app.use('/api', (req, res, next) => {
    // Extracting the hash parameter from the request body.
    const { hash } = req.body;

    // Check if the provided hash contains exactly 128 characters.
    if (hash.length !== 128) return res.status(400).send('The hash length must be 128 characters.');

    // If the provided hash doesn't exist in the database, create it.
    if (!database.data.hasOwnProperty(hash)) {
        // Creating the hash in the database.
        database.data[hash] = {
            // Creating a unique ID for the hash in the database.
            id: crypto.randomBytes(64).toString('hex'),
            // Setting a custom title for the bot.
            title: 'The bot',
            // Setting a custom description for the bot.
            description: 'The description'
        };
    }

    // Continue to the next middleware.
    next();
});

// Handling incoming requests to the set_webhook endpoint.
app.use('/api/set_webhook', (req, res) => {
    // Extracting the webhook and hash parameters from the request body.
    const { webhook, hash } = req.body;

    // Checking if the provided webhook address is a valid domain.
    if (!/^(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(webhook)) return res.status(400).send('The webhook address is not a valid URL.');

    // Setting the provided webhook to the hash data.
    database.data[hash].webhook = webhook;

    // Sending a successful message.
    res.status(200).send('The webhook address has been set successfully.');

    // Saving the data to the database.
    database.save();
});

// Handling incoming requests to the set_title endpoint.
app.use('/api/set_title', (req, res) => {
    // Extracting the title and hash parameters from the request body.
    const { title, hash } = req.body;

    // Setting the provided title to the hash data.
    database.data[hash].title = title;

    // Sending a successful message.
    res.status(200).send('The new title has been set successfully.');

    // Saving the data to the database.
    database.save();
});

// Handling incoming requests to the set_description endpoint.
app.use('/api/set_description', (req, res) => {
    // Extracting the description and hash parameters from the request body.
    const { description, hash } = req.body;

    // Setting the provided description to the hash data.
    database.data[hash].description = description;

    // Sending a successful message.
    res.status(200).send('The new description has been set successfully.');

    // Saving the data to the database.
    database.save();
});

// Checking if the user has requested a page.
app.use('/', (req, res) => {
    // Getting the requested page path.
    const p = req.path.split('/')[1];

    // Getting the requested page from the request path.
    const page = ['bot'].includes(p) ? p : 'home'

    // Sending the requested page to the user.
    res.sendFile(path.join(process.cwd(), 'public', page, 'index.html'));
});

// Setting the trust proxy for the local network address. This one is used for express rate limit middleware.
app.set('trust proxy', '127.0.0.1');

// Running the app on the provided port and creating a new log into the console.
app.listen(process.env.PORT, () => console.log('> Running on:', chalk.cyan('http://localhost:' + process.env.PORT)));

// Creaging a new console log to check the node environment.
console.log('> Running on', chalk.magenta(process.env.NODE_ENV), 'mode');
