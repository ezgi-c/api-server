const { DataTypes } = require('sequelize');

function makeOrder(sequelize) {
    return sequelize.define('Order', {
        productName: DataTypes.STRING,
    });
}

module.exports = { makeOrder };