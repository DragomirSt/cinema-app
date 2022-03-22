
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const handlebars = require('./config/handlebars.js')(app);
require('dotenv').config();
app.use(express.json());

const router = require('./routes');
app.use(router);

const path = require('path');
app.use(express.static(path.resolve(__dirname, './static')));
app.locals.title = 'Cinema';

app.listen(PORT, console.log(`app is running on http://localhost:${PORT}`));