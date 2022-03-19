
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/movies', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/Top250Movies/${process.env.IMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const movies = data.items.slice(0, 20);
            res.render('top-20-movies', { movie: movies });
        })
        .catch(err => {
            throw err;
        });
});

router.get('/tv-series', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/Top250TVs/${process.env.IMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const tvSeries = data.items.slice(0, 20);
            res.render('top-20-tv-series', { tvSeries: tvSeries });
        })
        .catch(err => {
            throw err;
        });
});

router.get('/coming-soon', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/ComingSoon/${process.env.IMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const commingSoon = data.items;
            res.render('coming-soon', { newReleases: commingSoon });
        })
        .catch(err => {
            throw err;
        });
});

module.exports = router;