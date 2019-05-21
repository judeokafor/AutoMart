import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../dataStore/testData';
import server from '../server';
const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the order route', () => {
  it('should create an order successfully', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/order')
      .type('form')
      .send(testData.newOrder());
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should update the price of an order successfully', async () => {
    const res = await chai.request(server).put('/api/v1/order/5676/1000000000');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should return an error if order is not found', async () => {
    const res = await chai
      .request(server)
      .put('/api/v1/order/56761119/1000000000');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
  });
});