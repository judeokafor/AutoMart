import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../dataStore/testData';
import server from '../server';
const { expect } = chai;
chai.use(chaiHttp);

describe('Testing Automart app', () => {
  describe('Testing the user account creation/signup endpoint', () => {
    it('should create an account succesfully', async () => {
      const res = await chai
        .request(server)
        .post('/api/v1/auth/signUp')
        .type('form')
        .send(testData.newUser());
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('token');
    });
    it('should return an already existing user', async () => {
      const res = await chai
        .request(server)
        .post('/api/v1/auth/signUp')
        .type('form')
        .send(testData.existingUser());
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });

  describe('Testing the user account signIn endpoint', () => {
    it('should return password error', async () => {
      const res = await chai
        .request(server)
        .post('/api/v1/auth/signIn')
        .type('form')
        .send(testData.signInUserPasswordError());
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });

    it('should return user not found', async () => {
      const res = await chai
        .request(server)
        .post('/api/v1/auth/signIn')
        .type('form')
        .send(testData.strangeUser());
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should signIn a user successfully', async () => {
      const res = await chai
        .request(server)
        .post('/api/v1/auth/signIn')
        .type('form')
        .send(testData.signInUser());
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('token');
    });
  });

  describe('Testing the logout endpoint', () => {
    it('should log a user out succesfully', async () => {
      const res = await chai.request(server).get('/api/v1/auth/logout');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
  describe('Testing the authenticated current profile route', () => {
    it('should return error for the user profile not being authenticated', async () => {
      const res = await chai.request(server).get('/api/v1/auth/getProfile');
      expect(res).to.have.status(401);
    });
  });
});