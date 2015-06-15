var User = require('../models/models.user');
var Recipe = require('../models/models.recipe');
//var bcrypt = require('bcrypt-nodejs');
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

  getMe: function(req, res) {
    res.send(req.user)
  },

  /**
   * [getUserRecipes shows all recipes created by a particular user]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getUserRecipes: function(req, res, next) {
    Recipe.find({
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
    user.save(function(err, user) {
      if (err) {
        if (err.code == 11000) {
          res.json({
            success: false,
            message: 'A user with that username already exists.'
          });
        } else {
          res.json({
            message: 'Error creating users.'
          });
        }
      } else {
        console.log('++++++++++++++++>>>>>user creation succcseful');
        res.json({
          message: 'User created'
        });
      }
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
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user) {
      if (err) {
        res.json({
          message: 'Error logging in.'
        });
      }
      if (!user) {
        res.json({
          message: 'Incorrect username!'
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if (validPassword) {
          var token = jwt.sign({
            id: user._id
          }, jwtSecret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });
          res.json({
            success: true,
            message: 'token has been generated',
            tokengen: token,
            userdetails: user
          });
        } else {
          res.json({
            message: 'Incorrect password!'
          });
        }
      }
      next();
    });
  },

  verifyToken: function(req, res, next) {
    
    var token = req.body.token || req.headers['x-access-token'];
    if (!token) {
      req.data = JSON.parse(req.body.data);
      token = req.data.token;
    }
    if (token) {
      console.log(token);
      jwt.verify(token, jwtSecret, function(err, user) {
        if (err) {
          return res.json({
            message: 'Token could not be authenticated'
          });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      return res.status(403).json({
        message: 'Token not found'
      });
    }
  },

  getAUser: function(req, res) {
    User.findById({
      _id: req.params.user_id
    }, function(err, user) {
      if (err) {
        return res.json(err);
      }
      res.json(user);
    });
  }
};
