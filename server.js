require('dotenv').config();
const bodyParser = require('body-parser');
const db = require('./src/database');
const express = require('express');
const app = express();

const SHUTDOWN_TIMEOUT = 30 * 1000;

const users = require('./src/routes/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const cleanup = () => {
  db.close().then(() => process.exit());

  setTimeout(function () {
    console.error('Could not close connections in time, forcing shut down');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

module.exports = app;
