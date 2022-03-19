
const express = require('express');
const router = express.Router();
const movieController = require('./controlers/movieController');
const homePage = require('./controlers/homePage');

router.use(homePage);
router.use(movieController);

module.exports = router;