import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../fixtures/testData';
import server from '../server';

const { expect } = chai;
const url = '/api/v2';
const base = `${url}/auth`;
const base2 = `${url}/flag`;
let auth;
chai.use(chaiHttp);

describe('Testing the flag as fradulent route', () => {
  describe('Create report/flag as fradulent', () => {
    it('should create a report succesfully', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .send(testData.sampleNewReport());
      try {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
      } catch (error) {
        console.log(error);
      }
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .type('form')
        .send(testData.sampleErrorReport());
      try {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('it should view all flags', () => {
    before(async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signIn`)
        .send(testData.signInAdmin());
      try {
        const { token } = res.body;
        auth = token;
      } catch (error) {
        console.log(error);
      }
    });
    it('should view all flags successfully if authorized', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}`)
        .set('Authorization', auth);
      try {
        expect(res).to.have.status(200);
        expect(res).to.have.property('status');
      } catch (error) {
        console.log(error);
      }
    });
    it('should not view all flaged reported if unauthorized', async () => {
      const res = await chai.request(server).get(`${base2}`);
      try {
        expect(res).to.have.status(401);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
