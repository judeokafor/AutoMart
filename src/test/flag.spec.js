import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../fixtures/fixtures';
import server from '../server';
import pool from '../lib/config/dbConfig';

const { expect } = chai;
const url = '/api/v2';
const base = `${url}/auth`;
const base2 = `${url}/flag`;
let auth;
let userauth;
chai.use(chaiHttp);

describe('Testing the flag as fradulent route', () => {
  describe('Create report/flag as fradulent', () => {
    it('should create a report succesfully', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .send(testData.sampleNewReport());
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
    it('should create a report succesfully', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .send(testData.sampleNewReport());
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${base2}`)
        .type('form')
        .send(testData.sampleErrorReport());
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
    });
  });
  describe('it should view all flags', () => {
    before(async () => {
      const res = await chai
        .request(server)
        .post(`${base}/signIn`)
        .send(testData.signInAdmin());
      const { token } = res.body;
      auth = token;
    });
    it('should view all flags successfully if authorized', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}`)
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res).to.have.property('status');
    });
    it('should not view all flaged reported if unauthorized', async () => {
      const res = await chai.request(server).get(`${base2}`);
      expect(res).to.have.status(401);
    });
  });
  describe('should return empty flag table', () => {
    before(async () => {
      const client = await pool.connect();
      const dropTable = 'DROP TABLE IF EXISTS flags';
      await client.query(dropTable);
      const res = await chai
        .request(server)
        .post(`${base}/signIn`)
        .send(testData.signInAdmin());
      const { token } = res.body;
      auth = token;
    });
    it('should view all flags successfully if authorized', async () => {
      const res = await chai
        .request(server)
        .get(`${base2}`)
        .set('Authorization', auth);
      expect(res).to.have.status(404);
      expect(res).to.have.property('status');
    });
  });
});
