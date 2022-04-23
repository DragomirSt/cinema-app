
const fetch = require('node-fetch');

const FetchRequest = (url) => {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        });
};

module.exports = FetchRequest;