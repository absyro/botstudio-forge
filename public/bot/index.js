import '../javascript/main.js';

// Sending a request to fetch the information of the requested robot on the page.
fetch(window.location.origin + '/api/fetch_bot' + window.location.search, {
    // Using the GET method to send the request.
    method: 'GET'
    // Then fetching the received response from the request.
}).then(async (res) => {
    // Check if the response status code is 200 (ok).
    if (res.status === 200) {
        // Extracting the bot parameters from the response.
        const { id, name, description } = await res.json();

        // Setting the document's inner HTML based on the received parameters.
        document.body.innerHTML = /* html */ `
        <div class="container p-5">
            <div class="d-inline-block mb-5">
                <a href="/" class="btn btn-dark border border-secondary border-opacity-25 d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
                    Back
                </a>
            </div>
            <h1 class="d-flex align-items-center justify-content-between">${name}<b>${id}</b></h1>
            <p class="text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 20 20">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                ${description}
            </p>
            <hr class="border border-secondary border-opacity-25">
            <div id="conversation"></div>
            <form class="input-group mb-3" id="message-form">
                <input type="text" class="form-control rounded-start-1 shadow-none py-2 border-secondary border-opacity-25" placeholder="Message..." aria-label="Message">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary border-secondary border-opacity-25 rounded-start-0 rounded-end-1 py-2 text-white" type="submit">Send Message</button>
                </div>
            </form>
        </div>`;

        // Connecting to the websocket server on port 4020.
        const socket = new WebSocket('ws://localhost:4020');

        // Handling websocket server disconnection events. If the websocket server was disconnected, reload this page.
        socket.addEventListener('close', () => window.location.reload());

        // Getting the message form element.
        const messageForm = document.getElementById('message-form');

        // Listening to all incoming messages from the websocket client.
        socket.addEventListener('message', ({ data }) => {
            console.log(data);
        });

        // Setting a new submit action for the message form.
        messageForm.onsubmit = (event) => {
            // Preventing the default event handler for forms.
            event.preventDefault();

            // Getting the text input in the form.
            const input = messageForm.querySelector('input');

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

            // Resetting the input value.
            input.value = null;
        };
    }
});
