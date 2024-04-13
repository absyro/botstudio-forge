if (!window.sessionStorage.getItem('session')) {
    const buffer = new Uint8Array(16);

    window.crypto.getRandomValues(buffer);

    const hashArray = Array.from(buffer).map((byte) => byte.toString(16).padStart(2, '0'));

    window.sessionStorage.setItem('session', hashArray.join(''));
}

fetch(window.location.origin + '/api/fetch_bot' + window.location.search, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(async (res) => {
    if (res.status === 200) {
        const { id, name, description } = await res.json();

        document.body.innerHTML = /* html */ `
        <div class="container">
            <h1>${name}</h1>
            <p>${description}</p>
        </div>`;
    }
});
