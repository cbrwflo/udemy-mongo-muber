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

  it('DELETE to /api/drivers removes an existing driver', done => {
    const driver1 = new Driver({ email: 'z@z.com ' });
    const driver2 = new Driver({ email: 'y@y.com ' });
    
    driver2.save().then(() => {
      driver1.save().then(() => {
        request(app)
        .delete(`/api/drivers/${driver1._id}`)
        .end(() => {
          Driver.count().then(count => expect(count).toBe(1));
  
          Driver.findOne({ email: 'z@z.com' }).then((updatedDriver) => {
            expect(updatedDriver).toBe(null);
            done();
          });
        });
      });
    });
  });
});
