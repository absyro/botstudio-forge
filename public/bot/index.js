fetch(window.location.origin + '/api/fetch_bot', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(async (res) => {
    console.log(await res.json());
});
