var User = require('../models/models.user');

module.exports = {
/**
 * [getUsers shows all users]
 * @param  {[req]}
 * @param  {[res]}
 * @return {[void]}
 */
  getUsers: function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  },
/**
 * [createUsers allows user to register]
 * @param  {[req]}
 * @param  {[res]}
 * @return {[void]}
 */
  createUsers: function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.save(function(err) {
      if (err)
        res.send(err);
      res.json({
        message: 'user created!'
      });
    });
  }
};
