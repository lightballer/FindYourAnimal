const server = require('../server');
const request = require('supertest');

// comment
describe('Server', () => {
  it('User fisits home page', () => {
    return request(server).get('/').expect(200).expect('Hello World!');
  });
});
