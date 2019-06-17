import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import testData from '../dataStore/testData';

let auth;
let adminauth;
const url = '/api/v2';
const base = `${url}/auth`;
const base2 = `${url}/car`;
const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the car advert placement route', () => {
  before(async () => {
    const res = await chai
      .request(server)
      .post(`${base}/signIn`)
      .send(testData.signInSeller());
    try {
      const { token } = res.body;
      auth = token;
    } catch (error) {
      console.log(error);
    }
  });
  describe('should upload image to cloudinary and create a post', () => {
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .set('Authorization', auth)
        .send(testData.errorCarAdvert());
      try {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('should mark an advert as sold', () => {
    it('should mark an order as sold', async () => {
      try {
        const res = await chai
          .request(server)
          .patch(`${base2}/1/status`)
          .type('form')
          .send({ status: 'sold' })
          .set('Authorization', auth);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
      } catch (error) {
        console.log(error);
      }
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/1a/status`)
        .set('Authorization', auth);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
    it('should return an error if an order doesnt exist', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/111/status`)
        .set('Authorization', auth)
        .send({ status: 'sold' });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should update the price of an order ', () => {
    it('should update the price of an order successfully', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/1/price`)
        .set('Authorization', auth)
        .send({ price: 10000000 });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/1/price`)
        .set('Authorization', auth)
        .send({ price: 'a' });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/4411144/price`)
        .set('Authorization', auth)
        .send({ price: 10000000 });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should get details of a specific car', () => {
    it('should get details successfully', async () => {
      const res = await chai.request(server).get(`${base2}/1`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai.request(server).get(`${base2}/4411144`);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}/vacdq`)
        .set('Authorization', auth);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
  });
  describe('should get details of all unsold cars', () => {
    it('should get all cars that has status of available', async () => {
      const res = await chai.request(server).get(`${base2}?status=available`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return a validation error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=availablessss`);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
  });

  describe('delete a particular advert', () => {
    it('should delete a particular advert if authencticated as an admin and user', async () => {
      const res = await chai
        .request(server)
        .delete(`${base2}/1`)
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .delete(`${base2}/100`)
        .set('Authorization', auth);
      expect(res).to.have.status(404);
    });
  });
  describe('view all adverts as an admin', () => {
    before(async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signIn`)
        .send(testData.signInAdmin());
      const { token } = res.body;
      adminauth = token;
    });
    it('view all adverts succesfully', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}`)
        .set('Authorization', adminauth);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if not authorized', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}`)
        .set('Authorization', auth);
      expect(res).to.have.status(401);
    });
  });
  describe('should get details of all unsold cars of a particular manufacturer', () => {
    it('should get all cars from a particular manufacturer successfully', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car/viewUnsoldCarsWithMake/Toyota');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car/viewUnsoldCarsWithMake/Toy');
      expect(res).to.have.status(404);
    });
  });
  describe('should get details of all unsold cars of a particular body type', () => {
    it('should get all cars from a particular body type successfully', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car/viewAllWithSpecificBodyType/Sedan');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car/viewAllWithSpecificBodyType/Sedanzzz');
      expect(res).to.have.status(404);
    });
  });
});
