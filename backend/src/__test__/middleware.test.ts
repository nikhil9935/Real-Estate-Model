import request from 'supertest';
import express from 'express';
import { authenticateToken } from '../modules/listings/middleware/authMiddleware';

const app = express();
app.use(authenticateToken);

app.get('/user/listings', (req, res) => {
  res.json({ message: 'Protected route accessed successfully!' });
});

describe('authenticateToken middleware', () => {
 

  it('should return 401 if token is not provided', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Access denied. Token not provided' });
  });

 

  it('should return 403 if token is invalid', async () => {
    const invalidToken = 'invalidToken';

    const response = await request(app)
      .get('/user/listings')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: 'Invalid token' });
  });
});
