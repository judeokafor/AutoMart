// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import testData from '../dataStore/testData';
// import server from '../server';

// let auth;
// const { expect } = chai;
// chai.use(chaiHttp);

// describe('Testing the reset password functionality', () => {
//   describe('Test the password reactivation', () => {
//     it('should send password reset to email', async () => {
//       const res = await chai
//         .request(server)
//         .post('/api/v1/reset/resetPassword')
//         .type('form')
//         .send({ email: 'okaforjudechukwuebuka@gmail.com' });
//       expect(res).to.have.status(201);
//       expect(res.body).to.have.property('status');
//       expect(res.body).to.have.property('data');
//       expect(res.body).to.have.property('message');
//     });
//     it('should return an error user not found', async () => {
//       const res = await chai
//         .request(server)
//         .post('/api/v1/reset/resetPassword')
//         .type('form')
//         .send({ email: 'notfound@gmail.com' });
//       expect(res).to.have.status(404);
//       expect(res.body).to.have.property('status');
//       expect(res.body).to.have.property('message');
//     });
//     // test for sending email to return status of 409
//   });
//   describe('Test the confirm password route', () => {
//     before('it should send a mail for request a new password', async () => {
//       const res = await chai
//         .request(server)
//         .post('/api/v1/reset/resetPassword')
//         .type('form')
//         .send({ email: 'okaforjudechukwuebuka@gmail.com' });
//       const { token } = res.body.data;
//       auth = token;
//     });
//     it('should reset password successfully', async () => {
//       const res = await chai
//         .request(server)
//         .post(`/api/v1/reset/confirmReset/?token=${auth}`)
//         .type('form')
//         .send(testData.resetPasswordTrue());
//       expect(res).to.have.status(201);
//       expect(res.body).to.have.property('status');
//       expect(res.body).to.have.property('message');
//       expect(res.body).to.have.property('data');
//     });
//     it('should return error if password not equal to confirm password', async () => {
//       const res = await chai
//         .request(server)
//         .post(`/api/v1/reset/confirmReset/?token=${auth}`)
//         .type('form')
//         .send(testData.resetPasswordError());
//       expect(res).to.have.status(400);
//       expect(res.body).to.have.property('status');
//       expect(res.body).to.have.property('message');
//     });
//     it('should return an error if unauthorized user', async () => {
//       const res = await chai
//         .request(server)
//         .post('/api/v1/reset/resetPassword')
//         .type('form')
//         .send(testData.resetPasswordTrue());
//       expect(res).to.have.status(404);
//       expect(res.body).to.have.property('status');
//       expect(res.body).to.have.property('message');
//     });
//   });
// });
