
import  request from "supertest";
import App from "../app";

let app:any;

beforeAll(() => {
  app = new App().getApp(); 
});

describe('App Endpoints', () => {
  it('should return welcome message on / GET', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome.');
  });

  it('should connect to user router on /user', async () => {
    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(200);
  });
});

describe('App Middleware', () => {
  it('should enable CORS for specified origin', async () => {
    const response = await request(app).get('/');
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });

});
