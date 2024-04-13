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
