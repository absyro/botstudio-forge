import '../javascript/main.js';

// Checking if the session exists in the browser's session storage.
if (!window.sessionStorage.getItem('session')) {
    // Creating a buffer of unit 8 arrays with 32 characters.
    const buffer = new Uint8Array(32);

    // Getting a random value from the buffer using crypto.
    window.crypto.getRandomValues(buffer);

    // Creating a hash array as the session.
    const hashArray = Array.from(buffer).map((byte) => byte.toString(16).padStart(2, '0'));

    // Setting the browser's session storage's session.
    window.sessionStorage.setItem('session', hashArray.join(''));
}

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
            <h1 class="d-flex align-items-center justify-content-between">${name}<b>${id}</b></h1>
            <p class="text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 20 20">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                ${description}
            </p>
            <hr class="border border-secondary border-opacity-25">
        </div>`;
    }
});
