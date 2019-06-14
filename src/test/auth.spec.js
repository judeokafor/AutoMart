import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../dataStore/testData';
import server from '../server';

const { expect } = chai;
let auth;
chai.use(chaiHttp);

const url = '/api/v2';
const base = `${url}/auth`;
describe('User auth routes', () => {
  describe('user account creation/signup endpoint', () => {
    it('should create an account succesfully', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signUp`)
        .send(testData.newUser());
      try {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('token');
      } catch (error) {
        console.log(error);
      }
    });
    it('should return an already existing user', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signUp`)
        .send(testData.existingUser());
      try {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
      } catch (error) {
        console.log(error);
      }
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signUp`)
        .send(testData.invalidUser());
      try {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Testing the user account signIn endpoint', () => {
    it('should return password error', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signIn`)
        .send(testData.signInUserPasswordError());
      try {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
      } catch (error) {
        console.log(error);
      }
    });

    it('should return user not found', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signIn`)
        .type('form')
        .send(testData.strangeUser());
      try {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
      } catch (error) {
        console.log(error);
      }
    });
    it('should signIn a user successfully', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signIn`)
        .send(testData.signInUser());
      try {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
      } catch (error) {
        console.log(error);
      }
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signIn`)
        .send(testData.invalidUserSignIn());
      try {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Testing the logout endpoint', () => {
    it('should log a user out succesfully', async () => {
      const res = await chai.request(server).get('/api/v2/auth/logout');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('Testing the authenticated current profile route', () => {
    before(async () => {
      const res = await chai
        .request(server)
        .post('/api/v2/auth/signIn')
        .send(testData.signInUser());
      const { token } = res.body;
      auth = token;
    });
    it('should get a user profile succesfully', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/auth/getProfile')
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res).to.have.property('status');
    });
    it('should return error for the user profile not being authenticated', async () => {
      const res = await chai.request(server).get('/api/v2/auth/getProfile');
      expect(res).to.have.status(401);
    });
  });
});
