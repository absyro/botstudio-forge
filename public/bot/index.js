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
        <div class="container">
            <h1>${name}</h1>
            <p>${description}</p>
        </div>`;
    }
});
