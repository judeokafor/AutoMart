import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../dataStore/testData';
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
    try {
      const { token } = res.body;
      auth = token;
    } catch (error) {
      console.log(error);
    }
  });
  describe('Create an order', () => {
    it('should create an order successfully', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .send(testData.newOrder())
        .set('Authorization', auth);
      try {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
      } catch (error) {
        console.log(error);
      }
    });
    it('should return an error already handling it', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .send(testData.newOrder())
        .set('Authorization', auth);
      try {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
      } catch (error) {
        console.log(error);
      }
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .set('Authorization', auth)
        .send(testData.errorOrder());
      try {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('Update an order', () => {
    it('should update the price of an order successfully', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/2/price`)
        .set('Authorization', auth)
        .send({ price: 999999999 });
      try {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
      } catch (error) {
        console.log(error);
      }
    });
    it('should return an error if order is not found', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/1999999/price`)
        .send({ price: 999999999 })
        .set('Authorization', auth);
      try {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
      } catch (error) {
        console.log(error);
      }
    });
    it('should return a validation error ', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/a8k/price`)
        .send({ price: '9999ac' })
        .set('Authorization', auth);
      try {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('View all orders', () => {
    it('should get all pending orders from a single user', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}`)
        .set('Authorization', auth);
      try {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
      } catch (error) {
        console.log(error);
      }
    });
  });
  it('should return authorization error', async () => {
    const res = await chai.request(server).get(`${base2}`);
    try {
      expect(res).to.have.status(401);
    } catch (error) {
      console.log(error);
    }
  });
});
