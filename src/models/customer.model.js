const { DataTypes } = require('sequelize');

function makeCustomer(sequelize) {
    return sequelize.define('Customer', {
        name: DataTypes.STRING,
        email: DataTypes.STRING
    });
}

module.exports = { makeCustomer };