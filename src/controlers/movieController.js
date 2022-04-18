
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/movies', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/Top250Movies/${process.env.IMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const movies = data.items.slice(0, 20);
            return res.render('top-20-movies', { title: 'Top 20s Movies', movie: movies });
        })
        .catch(err => {
            return res.status('503').render('503');
        });
});

router.get('/tv-series', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/Top250TVs/${process.env.IMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const tvSeries = data.items.slice(0, 20);
            return res.render('top-20-tv-series', { title: 'Top 20s TV Series', tvSeries: tvSeries });
        })
        .catch(err => {
            return res.status('503').render('503');
        });
});

router.get('/coming-soon', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/ComingSoon/${process.env.IMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const commingSoon = data.items;
            return res.render('coming-soon', { title: 'Coming Soon', newReleases: commingSoon });
        })
        .catch(err => {
            return res.status('503').render('503');
        });
});

router.get('/watch-now', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/InTheaters/${process.env.IMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const inTheaters = data.items;
            return res.render('watch-now', { title: 'In Theatres', watchNow: inTheaters });
        })
        .catch(err => {
            return res.status('503').render('503');
        });
});

router.get('/trailer/:id', (req, res) => {
    return fetch(`https://imdb-api.com/en/API/Trailer/${process.env.IMDB_API_KEY}/${req.params.id}`)
        .then(res => res.json())
        .then(trailer => {
            res.redirect(trailer.link);
        })
        .catch(err => {
            return res.status('503').render('503');
        });
});

router.get('/search', (req, res) => {
    if (req.query.text !== undefined) {
        return fetch(`https://imdb-api.com/en/API/SearchTitle/${process.env.IMDB_API_KEY}/${req.query.text}`)
            .then(res => res.json())
            .then(movie => {

                const searchResult = movie.results[0];
                const errorMessage = 'Could not find your movie, try again.';
                res.render('search', { title: 'Search IMDB', result: searchResult, error: errorMessage });
            })
            .catch(err => {
                return res.status('503').render('503');
            });
    } else {
        return res.render('search');
    }
});

router.get('/movie-plot/:id', async (req, res) => {
    const details = {
        img: '',
        description: '',
        id: ''
    };

    try {
        const data = await fetch(`https://imdb-api.com/en/API/Wikipedia/${process.env.IMDB_API_KEY}/${req.params.id}`);
        const plot = await data.json();
        details.description = plot.plotShort.plainText;
        details.id = plot.imDbId;

    } catch (error) {
        return res.status('503').render('503');
    };

    try {
        const poster = await fetch(`https://imdb-api.com/en/API/Posters/${process.env.IMDB_API_KEY}/${req.params.id}`);
        const image = await poster.json();
        details.img = image.posters[0].link;

    } catch (error) {
        return res.status('503').render('503');
    };

    return res.render('plot', { title: 'Movie Plot', result: details });
});

module.exports = router;