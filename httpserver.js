const express = require('express');
const { requireHttps } = require('./middleware/requireHttps');

const app = express();
app.listen(5001);
app.use(requireHttps);
