const path = require('path');
const os = require('os');

module.exports = function (app) {
  app.use((req, res, next) => {
    req.path = path.resolve(path.join(os.tmpdir(), req.path));
    next();
  });
};
