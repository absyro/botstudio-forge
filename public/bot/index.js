fetch(window.location.origin + '/api/fetch_bot' + window.location.search, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(async (res) => {
    const { id, title, description } = await res.json();
});
