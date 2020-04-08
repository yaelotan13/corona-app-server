const express = require('express');
const cors = require('cors');
const { routes } = require('./routes');
const { errorHandler500 } = require("./middleware");

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.use(errorHandler500);

module.exports = app;