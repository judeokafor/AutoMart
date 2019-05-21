import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../dataStore/testData';
import server from '../server';
const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the flag as fradulent route', () => {
  it('should create a report succesfully', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/flag')
      .type('form')
      .send(testData.sampleNewReport());
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should not view all flaged reported if unauthorized', async () => {
    const res = await chai.request(server).get('/api/v1/flag');
    expect(res).to.have.status(401);
  });
});
