require('dotenv').config();
const bodyParser = require('body-parser');
const db = require('./src/database');
const express = require('express');
const app = express();

const SHUTDOWN_TIMEOUT = 30 * 1000;

const routers = require('./src/routes/');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = Object.keys(routers);
routes.map((route) => app.use(route, routers[route]));

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
