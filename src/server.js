const express = require('express');
const { customerRoutes } = require('./routes/customer.route');

const { logger } = require('./middleware/logger');

const { notFound } = require('./error.handlers/404');
const { serverError } = require('./error.handlers/500');

const server = express();

server.use(logger);
server.use(express.json());

server.use(customerRoutes);

server.use(notFound);
server.use(serverError);

module.exports = { server };