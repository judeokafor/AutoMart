import chai from 'chai';
import server from '../server';
const { expect } = chai;

describe('test', () => {
  it('should return a string', () => {
    expect('Welcome to jude app').to.equal('Welcome to jude app');
  });
});
