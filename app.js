const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/muber', { useMongoClient: true });
}

app.use(bodyParser.json());
app.disable('x-powered-by');
routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err._message, });
});

module.exports = app;
