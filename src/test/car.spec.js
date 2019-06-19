import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import testData from '../fixtures/fixtures';

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
    const { token } = res.body;
    auth = token;
  });
  describe('should upload image to cloudinary and create a post', () => {
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .set('Authorization', auth)
        .send(testData.errorCarAdvert());

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
    it('should return an error when uploading', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .set('Authorization', auth)
        .send(testData.postCarAdvert());
      expect(res).to.have.status(500);
      expect(res.body).to.have.property('status');
    });
    it('should upload a file successfully', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .set('Authorization', auth)
        .type('form')
        .field('model', 'Sequoia Jeep')
        .field('manufacturer', 'Toyota')
        .field('transmission', 'Automatic')
        .field('year', '2011')
        .field('fuelType', 'Fuel')
        .field('state', 'new')
        .field('bodyType', 'Sedan')
        .field('price', '4500000')
        .field('description', 'Still intact and waxing stronger by the day')
        .field('status', 'available')
        .field('Content-Type', 'multipart/form-data')
        .attach('imageUrl', 'UI/assest/images/images4.jpg');

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
    });
  });
  describe('should mark an advert as sold', () => {
    it('should mark an order as sold', async () => {
      const res = await chai
        .request(server)
        .patch(`${base2}/1/status`)
        .type('form')
        .send({ status: 'sold' })
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
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
  describe('should get details of all unsold cars within a particular range', () => {
    it('should get all cars that has status of available within a range', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&min=1000000&max=4500000`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&min=10&max=150`);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&min=-1&max=-abcd`);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
    it('should return an unauthorized error', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&min=-1&max=abcd`)
        .set('Authorization', auth);
      expect(res).to.have.status(401);
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
    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .delete(`${base2}/abcd`)
        .set('Authorization', auth);
      expect(res).to.have.status(400);
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
        .get(`${base2}?status=available&manufacturer=Toyota`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should return an error if no data supplied', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&manufacturer=s`);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
    it('should return an unauthorized error', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&manufacturer=Toyota`)
        .set('Authorization', auth);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
    });
  });
  describe('should get details of all unsold cars of a particular body type', () => {
    it('should get all cars from a particular body type successfully', async () => {
      const res = await chai.request(server).get(`${base2}?bodyType=Sedan`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
    it('should get all cars from a particular body type successfully', async () => {
      const res = await chai.request(server).get(`${base2}?bodyType=a`);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
    it('should return an error if it doesnt exist', async () => {
      const res = await chai.request(server).get(`${base2}?bodyType=Sedanzzz`);
      expect(res).to.have.status(404);
    });
    it('should return an unauthorized error', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?bodyType=Sedan`)
        .set('Authorization', auth);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
    });
  });
  describe('should get all available used cars', () => {
    it('should get all available used cars successfully', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&state=used`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
    });

    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&state=usedzzzz`);
      expect(res).to.have.status(400);
    });
    it('should return an unauthorized error', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&state=used`)
        .set('Authorization', auth);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
    });
  });
  describe('should get all available used cars', () => {
    it('should get all available used cars successfully', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&state=new`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
    });

    it('should return an error if it doesnt exist', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&state=newzzzz`);
      expect(res).to.have.status(400);
    });
    it('should return an unauthorized error', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}?status=available&state=new`)
        .set('Authorization', auth);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
    });
  });
  // describe('should test advert routes without car tables', () => {
  //   before(async () => {
  //     const client = await pool.connect();
  //     const dropTable = 'DROP TABLE IF EXISTS cars';
  //     await client.query(dropTable);
  //     const res = await chai
  //       .request(server)
  //       .post(`${base}/signIn`)
  //       .send(testData.signInAdmin());
  //     const { token } = res.body;
  //     adminauth = token;
  //   });
  //   it('should return an error if cars not found', async () => {
  //     const res = await chai
  //       .request(server)
  //       .get(`${base2}`)
  //       .set('Authorization', adminauth);
  //     expect(res).to.have.status(404);
  //   });
  //   it('should return an error if manufacturer cars not available', async () => {
  //     const res = await chai
  //       .request(server)
  //       .get(`${base2}?status=available&manufacturer=Toyota`);
  //     expect(res).to.have.status(404);
  //     expect(res.body).to.have.property('status');
  //   });
  //   it('should return an error if cars with state not available', async () => {
  //     const res = await chai
  //       .request(server)
  //       .get(`${base2}?status=available&state=used`);
  //     expect(res).to.have.status(404);
  //     expect(res.body).to.have.property('status');
  //   });
  //   it('should return an error if cars with state not available', async () => {
  //     const res = await chai.request(server).get(`${base2}?status=available`);
  //     expect(res).to.have.status(404);
  //     expect(res.body).to.have.property('status');
  //   });
  // });
});
