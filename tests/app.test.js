const expect = require('expect');
const request = require('supertest');
const app = require('./../app');

describe('/api', () => {
  it('handles a GET request', (done) => {
    request(app)
      .get('/api')
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.hi).toBe('there');
        done();
      });
  });
});