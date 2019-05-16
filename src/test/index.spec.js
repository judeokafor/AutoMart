const { expect } = require('chai');
const server = require('../server');

describe('test', () => {
  it('should return a string', () => {
    expect('Welcome to jude app').to.equal('Welcome to jude app');
  });
});
