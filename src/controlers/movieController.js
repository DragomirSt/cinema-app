
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/movies', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/Top250Movies/${process.env.IMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const movies = data.items.slice(0, 20);
            res.render('top-20-movies', { title: 'Top 20s Movies', movie: movies });
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
            res.render('top-20-tv-series', { title: 'Top 20s TV Series', tvSeries: tvSeries });
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
            res.render('coming-soon', { title: 'Coming Soon', newReleases: commingSoon });
        })
        .catch(err => {
            throw err;
        });
});

router.get('/watch-now', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/InTheaters/${process.env.IMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const inTheaters = data.items;
            res.render('watch-now', { title: 'In Theatres', watchNow: inTheaters });
        })
        .catch(err => {
            throw err;
        });
});

router.get('/trailer/:id', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/Trailer/${process.env.IMDB_API_KEY}/${req.params.id}`)
        .then(res => res.json())
        .then(trailer => {
            res.redirect(trailer.link);
        })
        .catch(err => {
            throw err;
        });
});

router.get('/search', (req, res) => {
    if (req.query.text !== undefined) {
        return fetch(`https://imdb-api.com/en/API/SearchTitle/${process.env.IMDB_API_KEY}/${req.query.text}`)
            .then(res => res.json())
            .then(movie => {

                const searchResults = movie.results;
                res.render('search', { title: 'Search IMDB', results: searchResults });
            })
            .catch(err => {
                throw err;
            });
    } else {
        res.render('search');
    }
});

module.exports = router;