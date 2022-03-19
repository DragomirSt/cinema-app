
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/movies', async (req, res) => {
    return fetch(`https://imdb-api.com/en/API/Top250Movies/${process.env.NASA_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const movies = data.items.slice(0, 20);
            res.render('top-20-movies', { movie: movies })
        })
        .catch(err => {
            throw err;
        });
});

module.exports = router;