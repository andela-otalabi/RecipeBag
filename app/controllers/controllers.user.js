var User = require('../models/models.user');
var Recipe = require('../models/models.recipe');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var jwtSecret = 'abcd566wgghas/ons09as9';

module.exports = {
  /**
   * [getUsers shows all users]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getUsers: function(req, res, next) {
    User.find(function(err, users) {
      if (err) {
        res.json({
          message: 'Error getting users.'
        });
      }
      if (users) {
        res.json(users);
      }
      next();
    });
  },
  /**
   * [getUserRecipes shows all recipes created by a particular user]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getUserRecipes: function(req, res, next) {
    Recipe.find({
      approved: true,
      user: req.params.user_id
    }, function(err, recipe) {
      if (err) {
        res.json({
          message: 'Error getting recipes.'
        });
      }
      if (recipe) {
        res.json(recipe);
      }
      next();
    });
  },
  /**
   * [createUsers allows user to register]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  createUsers: function(req, res, next) {
    var user = new User(req.body);
    var hash = bcrypt.hashSync(req.body.username + req.body.password + new Date().getTime());
    user.token = hash;
    user.save(function(err) {
      if (err) {
        res.json({
          message: 'Error creating users.'
        });
      } else {
        res.json({
          message: 'User created'
        });
      }
      next();
    });
  },

  deleteUser: function(req, res, next) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err) {
        res.json({
          message: 'Error getting recipes.'
        });
      }
      if (user) {
        res.json({
          message: 'Successfully deleted'
        });
      }
      next();
    });
  },

  userLogin: function(req, res, next) {
    var token = jwt.sign({
      username: req.body.username
    }, jwtSecret);
    User.find({
      username: req.body.username
    }, function(err, user) {
      if (user.length === 0) {
        return res.json({
          message: 'Incorrect username!'
        });
      } else if (user.length === 1) {
        if (user[0].password === req.body.password) {
          return res.json({
            tokengen: token,
            userdetails: user
          });
        } else {
          return res.json({
            message: 'Incorrect password!'
          });
        }
      }
      next();
    });
  }
};
