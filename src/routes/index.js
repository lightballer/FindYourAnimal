const usersRoutes = require('./users');
const dialogsRoutes = require('./dialogs');
const messagesRoutes = require('./messages');

module.exports = {
  '/users': usersRoutes,
  '/dialogs': dialogsRoutes,
  '/messages': messagesRoutes,
};
