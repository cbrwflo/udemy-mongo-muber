const express = require('express');
const routes = require('./routes/routes');
const app = express();
app.disable('x-powered-by');
routes(app);

module.exports = app;
