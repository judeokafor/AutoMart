import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../fixtures/fixtures';
import server from '../server';

let auth;
let adminauth;
const { expect } = chai;
const url = '/api/v2';
const base = `${url}/users`;
const base2 = `${url}/auth`;
chai.use(chaiHttp);

describe('Testing the reset password functionality', () => {
  before(async () => {
    const res = await chai
      .request(server)
      .post(`${base2}/signIn`)
      .send(testData.signInUser());
    const { token } = res.body;
    auth = token;
  });
  describe('Test the password reactivation', () => {
    it('should send password reset to email', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/okaforjudechukwuebuka@gmail.com/reset_password`);
      expect(res).to.have.status(204);
    });
    it('should reset password by an authenticated user', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/okaforjudechukwuebuka@gmail.com/reset_password`)
        .type('form')
        .send({ newPassword: '1234abcddA2' })
        .set('Authorization', auth);
      expect(res).to.have.status(204);
    });
    it('should return an error if unauthorized user', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/okaforjudechukwuebukagmailcom/reset_password`)
        .type('form')
        .send({ email: 'noemailgmailcom' });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
    it('should reset password by an authenticated user', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/okaforjudechukwuebuka@gmail.com/reset_password`)
        .set('Authorization', auth)
        .send({ newPassword: '12' });
      expect(res).to.have.status(400);
    });
    it('should return an error user not found', async () => {
      const res = await chai
        .request(server)
        .post(`${base}/notfound@gmail.com/reset_password`);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
});
describe('Testing the forbidden route', () => {
  before(async () => {
    const res = await chai
      .request(server)
      .post(`${base2}/signIn`)
      .send(testData.signInAdmin());
    const { token } = res.body;
    adminauth = token;
  });
  it('should return a forbidden error', async () => {
    const res = await chai
      .request(server)
      .post(`${base}/okaforjudechukwuebuka@gmail.com/reset_password`)
      .type('form')
      .send({ newPassword: '1234abcddA2', password: 'jude11aaww' })
      .set('Authorization', adminauth);
    expect(res).to.have.status(403);
  });
});
