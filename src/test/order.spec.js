import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../fixtures/fixtures';
import server from '../server';

let auth;
const url = '/api/v2';
const base = `${url}/auth`;
const base2 = `${url}/order`;
const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the order route', () => {
  before(async () => {
    const res = await chai
      .request(server)
      .post(`${base}/signIn`)
      .send(testData.signInUser());
    const { token } = res.body;
    auth = token;
  });
  describe('Create an order', () => {
    it('should create an order successfully', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .send(testData.newOrder())
        .set('Authorization', auth);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
    it('should return an error already handling it', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .send(testData.newOrder())
        .set('Authorization', auth);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .set('Authorization', auth)
        .send(testData.errorOrder());
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
  });
  describe('Update an order', () => {
    it('should update the price of an order successfully', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/3/price`)
        .send({ price: 999999999 })
        .set('Authorization', auth);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return an error if order is not found', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/1999999/price`)
        .send({ price: 999999999 })
        .set('Authorization', auth);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return a validation error ', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/a8k/price`)
        .send({ price: '9999ac' })
        .set('Authorization', auth);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
  });
  describe('View all orders', () => {
    it('should get all pending orders from a single user', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}`)
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  it('should return authorization error', async () => {
    const res = await chai.request(server).get(`${base2}`);
    expect(res).to.have.status(401);
  });
});
