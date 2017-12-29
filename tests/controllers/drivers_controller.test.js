const expect = require('expect');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('POST to /api/drivers creates a new driver', done => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.count().then(newCount => {
            expect(count + 1).toBe(newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers edits an existing driver', done => {
    const driver = new Driver({ email: 't@t.com ', driving: false });
    
    driver.save().then(() => {
      request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({ email: 't@t.com', driving: true })
      .end(() => {
        Driver.findOne({ email: 't@t.com' }).then((updatedDriver) => {
          expect(updatedDriver.driving).toBe(true);
          done();
        });
      });
    });
  });
});
