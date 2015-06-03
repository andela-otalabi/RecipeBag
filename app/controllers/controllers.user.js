var User = require('../models/models.user');

module.exports = {
/**
 * [getUsers description]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
  getUsers: function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  },
/**
 * [createUsers description]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
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
