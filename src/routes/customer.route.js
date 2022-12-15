const express = require('express');

const { Customer, Order } = require('../models/index');

const customerRoutes = express();

customerRoutes.get('/customer', getCustomers);
customerRoutes.get('/customer/:id', getCustomer);
customerRoutes.post('/customer', createCustomer);
customerRoutes.put('customer/:id', updateCustomer);
customerRoutes.delete('customer/:id', deleteCustomer);

async function getCustomers(_, res) {
  const allCustomers = await Customer.findAll();
  res.json(allCustomers);
}

async function getCustomer(req, res, next) {
  const id = req.params.id;
  const customer = await Customer.findOne({
    where: { id: id },
    include: Order,
  });
  if (customer === null) {
    next();
  } else {
    const rawCustomer = {
      id: customer.id,
      name: customer.name,
      orders: customer.Orders.map((order) => order.productName),
    };
    res.json(rawCustomer);
  }
}

async function createCustomer(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const customer = await Customer.create({
    name,
    email,
  });

  const orders = req.body.orders ?? [];
  for (const productName of orders) {
    await customer.createOrder({ productName });
  }
  res.json(customer);
}

async function deleteCustomer(req, res, next) {
  const id = req.params.id;
  const customer = await Customer.findOne({ where: { id: id } });
  if (customer === null) {
    next();
  } else {
    await Customer.destroy();
    res.json({});
  }
}

async function updateCustomer(req, res, next) {
  const id = req.params.id;
  let customer = await Customer.findOne({ where: { id: id } });
  if (customer === null) {
    next();
  } else {
    const name = req.body.name ?? customer.name;
    const email = req.body.email ?? customer.email;
    let updatedCustomer = {
      name,
      email,
    };

    customer = await customer.update(updatedCustomer);

    res.json(customer);
  }
}

module.exports = { customerRoutes };
