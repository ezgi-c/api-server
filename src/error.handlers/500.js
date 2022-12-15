const serverError = (err, req, res, next) => {
    res.status(500).send({ message: 'there was a problem! 🧨', err });
};

module.exports = { serverError };