const express = require('express');
const cors = require('cors');
const { routes } = require('./routes');
const connectDB = require('./connect-to-db');
const { errorHandler500 } = require("./middleware");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

routes(app);

app.use(errorHandler500);

module.exports = app;