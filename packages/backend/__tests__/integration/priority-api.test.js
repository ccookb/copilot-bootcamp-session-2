const request = require('supertest');
const { app, db, resetItems } = require('../../src/app');

beforeEach(() => {
  resetItems();
});

afterAll(() => {
  if (db) {
    db.close();
  }
});

describe('Priority API integration', () => {
  test('creates items with valid priorities', async () => {
    const highResponse = await request(app)
      .post('/api/items')
      .send({ name: 'High task', priority: 'high' })
      .set('Accept', 'application/json');

    expect(highResponse.status).toBe(201);
    expect(highResponse.body.priority).toBe('high');

    const minorResponse = await request(app)
      .post('/api/items')
      .send({ name: 'Minor task', priority: 'minor' })
      .set('Accept', 'application/json');

    expect(minorResponse.status).toBe(201);
    expect(minorResponse.body.priority).toBe('minor');
  });

  test('defaults priority to medium when omitted', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: 'No priority provided' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.priority).toBe('medium');
  });

  test('rejects invalid priorities', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: 'Invalid priority', priority: 'critical' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Priority must be one of: high, medium, minor');
  });

  test('returns priority in list responses', async () => {
    await request(app)
      .post('/api/items')
      .send({ name: 'Task with priority', priority: 'medium' })
      .set('Accept', 'application/json');

    const listResponse = await request(app).get('/api/items');

    expect(listResponse.status).toBe(200);
    expect(Array.isArray(listResponse.body)).toBe(true);
    expect(listResponse.body.every(item => typeof item.priority === 'string')).toBe(true);
  });
});
