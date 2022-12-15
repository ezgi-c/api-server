const supertest = require('supertest');
const { sequelize } = require('../src/models');
const { server } = require('../src/server');

const request = supertest(server);

async function createCustomers() {
  await request.post('/customer').send({
    name: 'Ezgi',
    email: 'ezgicoban3261@gmail.com',
  });
  await request.post('/customer').send({
    name: 'Customer2',
    email: 'customer2@gmail.com',
  });
}

describe('customer routes', () => {
  beforeEach(() => sequelize.sync());
  afterEach(() => sequelize.drop());

  it('creates a customer', async () => {
    const response = await request.post('/customer').send({
      name: 'Ezgi',
      email: 'ezgicoban3261@gmail.com',
    });
    expect(response.status).toBe(200);
    const customer = response.body;
    expect(customer.name).toBe('Ezgi');
    expect(customer.email).toBe('ezgicoban3261@gmail.com');
  });

  it('gets a customer', async () => {
    await createCustomers();
    const response = await request.get('/customer/2');
    expect(response.status).toBe(200);
    const customer = response.body;
    expect(customer.name).toBe('Customer2');
    expect(customer.email).toBe('customer2@gmail.com');
  });

  it('gets all customers', async () => {
    await createCustomers();
    const response = await request.get('/customer');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    const customer = response.body[1];
    expect(customer.name).toBe('Customer2');
    expect(customer.email).toBe('customer2@gmail.com');
  });

  it('updates a customer', async () => {
    await createCustomers();

    const response = await request.put('/customer/2').send({
      email: 'customer2new@gmail.com',
    });
    expect(response.status).toBe(200);
    const customer = response.body;
    expect(customer.name).toBe('Customer2');
    expect(customer.email).toBe('customer2new@gmail.com');
  });

  it('creates a customer with orders', async () => {
    const response = await request.post('/customer').send({
      name: 'Melis',
      email: 'melis@gmail.com',
      orders: ['Sweater', 'Echo Dot', 'HoverBoard'],
    });

    expect(response.status).toBe(200);
    const id = response.body.id;

    const customer = await request.get(`/customer/${id}`);
    expect(customer.status).toBe(200);
    expect(customer.body.orders).toEqual(['Sweater', 'Echo Dot', 'HoverBoard']);
  });
});
