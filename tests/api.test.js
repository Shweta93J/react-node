const request = require('supertest');
const app = require('../server/app'); // Express app

describe('API Tests', () => {
  let itemId;

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '1234' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrongpass' });
    expect(res.statusCode).toEqual(401);
  });

  it('should create an item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ title: 'New Task' });
    expect(res.statusCode).toEqual(201);
    itemId = res.body.id;
  });

  it('should retrieve items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update the item', async () => {
    const res = await request(app)
      .put(`/items/${itemId}`)
      .send({ title: 'Updated Task' });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete the item', async () => {
    const res = await request(app).delete(`/items/${itemId}`);
    expect(res.statusCode).toEqual(204);
  });
});
