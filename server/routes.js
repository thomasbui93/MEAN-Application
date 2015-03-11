module.exports = function (app) {
  app.get('/testApi', function (req, res) {
    res.send('Hello there.');
  });
};