
const express = require('express');
const router = express.Router();

const FetchRequest = require('./../fetch');
const api = require('./../apis');
const regex = /[V][0-9][\D][UX]+[0-9]+[\D][CR0-9]+[\D][0-9][\D][0-9]+[\D][0-9]+[\D][AL]+/;

router.get('/movies', async (req, res) => {
    try {
        const data = await FetchRequest(`${api.movies}/${process.env.IMDB_API_KEY}`);

        const movies = data.items.slice(0, 20);
        movies.map(movie => {
            if (movie.image.match(regex)) {
                movie.image = movie.image.replace(regex, '');
            };
        });
        return res.render('top-20-movies', { title: 'Top 20s Movies', movie: movies });

    } catch (error) {
        return res.status('503').render('503');
    };
});

router.get('/tv-series', async (req, res) => {
    try {
        const data = await FetchRequest(`${api.series}/${process.env.IMDB_API_KEY}`);

        const tvSeries = data.items.slice(0, 20);
        tvSeries.map(series => {
            if (series.image.match(regex)) {
                series.image = series.image.replace(regex, '');
            };
        });
        return res.render('top-20-tv-series', { title: 'Top 20s TV Series', tvSeries: tvSeries });

    } catch (error) {
        return res.status('503').render('503');
    };
});

router.get('/coming-soon', async (req, res) => {
    try {
        const data = await FetchRequest(`${api.coming}/${process.env.IMDB_API_KEY}`);

        const commingSoon = data.items;
        commingSoon.map(coming => {
            if (coming.image.match(regex)) {
                coming.image = coming.image.replace(regex, '');
            };
        });
        return res.render('coming-soon', { title: 'Coming Soon', newReleases: commingSoon });

    } catch (error) {
        return res.status('503').render('503');
    };
});

router.get('/watch-now', async (req, res) => {
    try {
        const data = await FetchRequest(`${api.now}/${process.env.IMDB_API_KEY}`);

        const inTheaters = data.items;
        inTheaters.map(watch => {
            if (watch.image.match(regex)) {
                watch.image = watch.image.replace(regex, '');
            };
        });
        return res.render('watch-now', { title: 'In Theatres', watchNow: inTheaters });

    } catch (error) {
        return res.status('503').render('503');
    };
});

router.get('/movie-plot/:id', async (req, res) => {
    const details = {
        img: '',
        description: '',
        id: ''
    };

    try {
        const data = await FetchRequest(`${api.wiki}/${process.env.IMDB_API_KEY}/${req.params.id}`);

        details.description = data.plotShort.plainText;
        details.id = data.imDbId;

    } catch (error) {
        return res.status('503').render('503');
    };

    try {
        const poster = await FetchRequest(`${api.poster}/${process.env.IMDB_API_KEY}/${req.params.id}`);
        details.img = poster.posters[0].link;

    } catch (error) {
        return res.status('503').render('503');
    };

    return res.render('plot', { title: 'Movie Plot', result: details });
});

router.get('/trailer/:id', async (req, res) => {
    try {
        const data = await FetchRequest(`${api.trailer}/${process.env.IMDB_API_KEY}/${req.params.id}`);
        res.redirect(data.link);

    } catch (error) {
        return res.status('503').render('503');
    };
});

router.get('/search', async (req, res) => {
    if (req.query.text !== undefined) {
        try {
            const data = await FetchRequest(`${api.search}/${process.env.IMDB_API_KEY}/${req.query.text}`);

            const searchResult = data.results;
            const errorMessage = 'Could not find your movie, try again.';
            res.render('search', { title: 'Search IMDB', result: searchResult, error: errorMessage });

        } catch (error) {
            return res.status('503').render('503');
        };
    } else {
        return res.render('search');
    };
});

module.exports = router;