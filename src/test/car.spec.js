import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../dataStore/testData';
import server from '../server';
const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the car advert placement route', () => {
  describe('should upload image to cloudinary and create a post', () => {
    it('should return an error if image name already exist', async () => {
      const res = await chai
        .request(server)
        .post('/api/v1/car')
        .type('form')
        .send({ imageName: 'my_redcar.png' });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    // it('should create an advert successfully', async () => {
    //   const res = await chai
    //     .request(server)
    //     .post('/api/v1/car')
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
      const res = await chai.request(server).put('/api/v1/car/4444/sold');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if an order doesnt exist', async () => {
      const res = await chai.request(server).put('/api/v1/car/111111/sold');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should update the price of an order ', () => {
    it('should mark an order as sold', async () => {
      const res = await chai.request(server).put('/api/v1/car/4444/1000000');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai.request(server).put('/api/v1/car/4411144/1000000');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should get details of a specific car', () => {
    it('should mark an order as sold', async () => {
      const res = await chai.request(server).get('/api/v1/car/4444');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai.request(server).get('/api/v1/car/4411144');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should get details of all unsold cars', () => {
    it('should get all cars that has status of available', async () => {
      const res = await chai
        .request(server)
        .get('/api/v1/car/view?status=available');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get('/api/v1/car/view?status=availablessss');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('should get details of all unsold cars within a particular range', () => {
    it('should get all cars that has status of available within a range', async () => {
      const res = await chai
        .request(server)
        .get('/api/v1/car?status=available&min=1000000&max=1500000');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get('/api/v1/car?status=available&min=100&max=1500');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
});
