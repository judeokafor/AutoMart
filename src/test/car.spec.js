import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import testData from '../dataStore/testData';

let auth;
const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the car advert placement route', () => {
  before(async () => {
    const res = await chai
      .request(server)
      .post('/api/v2/auth/signIn')
      .send(testData.signInUser());
    const { token } = res.body;
    auth = token;
  });
  describe('should upload image to cloudinary and create a post', () => {
    it('should return an error if image name already exist', async () => {
      const res = await chai
        .request(server)
        .post('/api/v2/car')
        .set('Authorization', auth)
        .send({ imageName: 'my_redcar.png' });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post('/api/v2/car')
        .set('Authorization', auth)
        .send(testData.errorCarAdvert());
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
    // it('should create an advert successfully', async () => {
    //   const res = await chai
    //     .request(server)
    //     .post('/api/v2/car')
    //     .type('form')
    //     .send(testData.carAdvert());
    //   expect(res).to.have.status(201);
    //   expect(res.body).to.have.property('status');
    //   expect(res.body).to.have.property('message');
    //   expect(res.body).to.have.property('data');
    // });
  });
  describe('should mark an advert as sold', () => {
    it('should mark an order as sold', async () => {
      const res = await chai
        .request(server)
        .put('/api/v2/car/4444/sold')
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if an order doesnt exist', async () => {
      const res = await chai
        .request(server)
        .put('/api/v2/car/111111/sold')
        .set('Authorization', auth);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should update the price of an order ', () => {
    it('should update the price of an order successfully', async () => {
      const res = await chai
        .request(server)
        .put('/api/v2/car/4444/1000000')
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .put('/api/v2/car/4411144/1000000')
        .set('Authorization', auth);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should get details of a specific car', () => {
    it('should mark an order as sold', async () => {
      const res = await chai.request(server).get('/api/v2/car/4444');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai.request(server).get('/api/v2/car/4411144');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should get details of all unsold cars', () => {
    it('should get all cars that has status of available', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car/view?status=available');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car/view?status=availablessss');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should get details of all unsold cars within a particular range', () => {
    it('should get all cars that has status of available within a range', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car?status=available&min=1000000&max=1500000');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car?status=available&min=10&max=150');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('delete a particular advert', () => {
    it('should delete a particular advert if authencticated as an admin and user', async () => {
      const res = await chai
        .request(server)
        .delete('/api/v2/car/deleteAdvert/4444')
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car/deleteAdvert/4')
        .set('Authorization', auth);
      expect(res).to.have.status(404);
    });
  });
  describe('view all adverts as an admin', () => {
    it('view all adverts succesfully', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/car/viewAllAdverts')
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if not authorized', async () => {
      const res = await chai.request(server).get('/api/v2/car/viewAllAdverts');
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
  describe('should get all new unsold cars', () => {
    it('should get all new unsold cars successfully', async () => {
      const res = await chai.request(server).get('/api/v2/car/new');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai.request(server).get('/api/v2/car/newz');
      expect(res).to.have.status(404);
    });
  });
  describe('should get all new used cars', () => {
    it('should get all new used cars successfully', async () => {
      const res = await chai.request(server).get('/api/v2/car/used');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai.request(server).get('/api/v2/car/usedz');
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
