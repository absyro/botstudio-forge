import '../javascript/main.js';

// This function is used to format all links inside the string.
const formatStringLinks = (string) => string.replace(/\b(?:https?:\/\/)?((?:[a-zA-Z-]+\.)+[a-zA-Z]{2,})\b/g, '<a class="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="https://$1" target="_blank" rel="nofollow">$1</a>');

// This function is used to format all commands inside the string.
const formatCommands = (string) => string.replace(/(^|\s)\/(\w+)(?=\s|$)/g, '$1<span class="command">/$2</span>');

// This function is used to format the given string.
const formatString = (string) => formatCommands(formatStringLinks(string));

// Sending a request to fetch the information of the requested robot on the page.
fetch(window.location.origin + '/api/fetch_bot', {
    // Using the POST method to send the request.
    method: 'POST',
    // Setting the request headers.
    headers: {
        // Sending the request as a JSON request.
        'Content-Type': 'application/json'
    },
    // Stringifying the request body.
    body: JSON.stringify({
        // Sending the ID of the robot in the request body.
        id: new URLSearchParams(window.location.search).get('id')
    })
    // Then fetching the received response from the request.
}).then(async (res) => {
    // Check if the response status code is 200 (ok).
    if (res.status === 200) {
        // Extracting the bot parameters from the response.
        const { id, name, description, commands } = await res.json();

        // Setting the document's inner HTML based on the received parameters.
        document.body.innerHTML = /* html */ `
        <div class="container mt-5">
            <div class="d-inline-block mb-5">
                <a href="/" class="btn btn-dark border border-secondary border-opacity-25 d-flex align-items-center gap-2 rounded-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
                    Back
                </a>
            </div>
            <h1 class="d-flex align-items-center justify-content-between">${name}</h1>
            <p class="text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 20 20">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                ${description}
            </p>
            <hr class="border border-secondary border-opacity-25 mb-0">
            <div class="my-4 p-2 border border-secondary border-opacity-25 rounded-1 d-flex align-items-center flex-column gap-2 overflow-auto" id="conversation">
                <div class="m-auto text-muted" id="notice">Send a message to this robot to start chatting.</div>
            </div>
            <form class="input-group mb-3" id="message-form">
                <input name="message" type="text" class="form-control rounded-start-1 shadow-none py-2 border-secondary border-opacity-25" placeholder="Enter the message content...">
                <div class="input-group-append">
                    <button class="btn btn-dark border-secondary border-opacity-25 rounded-start-0 rounded-end-1 py-2 text-white" type="submit">Send Message</button>
                </div>
            </form>
        </div>`;

        // Connecting to the websocket server.
        const socket = new WebSocket('ws://' + (window.location.hostname ? 'localhost:5030' : 'websocket.forge.botstudioo.com'));

        // Handling websocket server disconnection events. If the websocket server was disconnected, reload this page.
        socket.addEventListener('close', () => window.location.reload());

        // Getting the message form element.
        const messageForm = document.getElementById('message-form');

        // Getting the text input in the form.
        const input = messageForm.querySelector('input');

        // The element of conversation is used to store the conversation data.
        const conversation = document.getElementById('conversation');

        // When the form is loaded, focus on the input element.
        input.focus();

        // Listening to all incoming messages from the websocket client.
        socket.addEventListener('message', ({ data }) => {
            // Extracting the data parameters.
            const { type, content } = JSON.parse(data);

            // Check if the data type is text, then add the message for the user.
            if (type === 'text') {
                // Add the message to the conversation element.
                conversation.appendChild(
                    // Creating a new div element.
                    Object.assign(document.createElement('div'), {
                        // Adding classes to the created div element.
                        className: 'message d-inline-block py-2 px-4 border border-secondary border-opacity-25 rounded-1 me-auto',
                        // Defining the inner HTML content of the div.
                        innerHTML: formatString(content)
                    })
                );
            }
        });

        // Setting a new submit action for the message form.
        messageForm.onsubmit = (event) => {
            // Preventing the default event handler for forms.
            event.preventDefault();

            // If there were no texts in the input, highlight the input field.
            if (!input.value.length) {
                // Change the input's background color.
                input.style.background = 'rgba(0, 0, 0, 0.125)';

                // Set a timeout of 2 seconds. After the timeout ends, remove the highlight of the input. Also, return and do not continue the process.
                return setTimeout(() => (input.style.background = ''), 2000);
            }

            // If the notice exists, remove it.
            conversation.querySelector('#notice')?.remove();

            // Sending a request to the websocket server.
            socket.send(
                // Stringify the JSON content of the request.
                JSON.stringify({
                    // Sending the request as text content.
                    type: 'text',
                    // Sending the content of the message.
                    content: input.value,
                    // Sending the ID of the current bot.
                    id
                })
            );

            // Add the message to the conversation element.
            conversation.appendChild(
                // Creating a new div element.
                Object.assign(document.createElement('div'), {
                    // Adding classes to the created div element.
                    className: 'message d-inline-block py-2 px-4 border border-info border-opacity-25 rounded-1 ms-auto',
                    // Defining the inner HTML content of the div.
                    innerHTML: formatString(input.value)
                })
            );

            // Scrolling to the end of the conversation element.
            conversation.scrollTop = conversation.scrollHeight;

            // Resetting the input value.
            input.value = null;
        };
    }
});
