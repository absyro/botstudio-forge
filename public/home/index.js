import '../javascript/main.js';

// Sending a GET request to fetch all bots from the server.
fetch(window.location.origin + '/api/fetch_bots', {
    // Using the GET method to send the request.
    method: 'GET'
    // Fetching the received response from the sent request.
}).then(async (res) => {
    // Extracting the JSON data that contains a list of all bots.
    const json = await res.json();

    // Setting the html content of the bots list to show bots.
    document.getElementById('list').innerHTML = json.map(
        ({ id, name, description }) => /* html */ `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card rounded-1">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                </div>
                <div class="card-footer">
                    <a href="bot?id=${id}" class="btn btn-dark border border-secondary border-opacity-25 d-flex align-items-center justify-content-center gap-1 rounded-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                            <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                        </svg>
                        Start
                    </a>
                </div>
            </div>
        </div>`
    );
});
