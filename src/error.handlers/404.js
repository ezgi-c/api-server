const notFound = ('*', (_, res) => res.status(404).send('No handler found 🙃'));

module.exports = { notFound };