const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  create(req, res) {
    const DriverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver));
  }
};