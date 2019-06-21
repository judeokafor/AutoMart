import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../dataStore/testData';
import server from '../server';

const { expect } = chai;
let auth;
chai.use(chaiHttp);

describe('Testing the flag as fradulent route', () => {
  it('should create a report succesfully', async () => {
    const res = await chai
      .request(server)
      .post('/api/v2/flag')
      .send(testData.sampleNewReport());
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should return a validation error', async () => {
    const res = await chai
      .request(server)
      .post('/api/v2/flag')
      .type('form')
      .send(testData.sampleErrorReport());
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  describe('it should view all flags', () => {
    before(async () => {
      const res = await chai
        .request(server)
        .post('/api/v2/auth/signIn')
        .send(testData.signInUser());
      const { token } = res.body;
      auth = token;
    });
    it('should view all flags successfully if authorized', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/flag')
        .set('Authorization', auth);
      expect(res).to.have.status(200);
      expect(res).to.have.property('status');
    });
    it('should return an error flag not exist', async () => {
      const res = await chai
        .request(server)
        .get('/api/v2/flagss')
        .set('Authorization', auth);
      expect(res).to.have.status(404);
    });
    it('should not view all flaged reported if unauthorized', async () => {
      const res = await chai.request(server).get('/api/v2/flag');
      expect(res).to.have.status(401);
    });
  });
});
