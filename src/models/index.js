const { Sequelize } = require('sequelize');
const { makeCustomer } = require('./customer.model');
const { makeOrder } = require('./order.model');


const DATABASE_URL = 
    process.env.NODE_ENV === 'test'
        ? 'sqlite::memory:'
        : process.env.DATABASE_URL;
    
const CONNECTION_OPTIONS =
    process.env.NODE_ENV === 'test'
        ? {}
        : {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        };

const sequelize = new Sequelize(DATABASE_URL, CONNECTION_OPTIONS);

const Customer = makeCustomer(sequelize);
const Order = makeOrder(sequelize);

Customer.hasMany(Order);

module.exports = {
    sequelize,
    Customer,
    Order
};