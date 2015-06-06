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
    /*var hash = bcrypt.hashSync(req.body.username + req.body.password + new Date().getTime());
    user.token = hash;*/
    user.save(function(err) {
      if (err) {
        if (err.code == 11000) {
          res.json({
            success: false,
            message: 'A user with that username already exists. '
          });
        }
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
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user) {
      if (err) {
        res.json({
          message: 'Error logging in.'
        });
      }
      if (!user) {
        return res.json({
          message: 'Incorrect username!'
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        /*console.log(validPassword);*/
        if (validPassword) {
          var token = jwt.sign({
            username: req.body.username
          }, jwtSecret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });
          return res.json({
            message: 'token has been generated',
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
  },

  verifyToken: function(req, res, next) {
    var token = req.headers['x-access-token'];
    //if there is a token, decode it
    if (token) {
      jwt.verify(token, jwtSecret, function(err, user) {
        if (err) {
          return res.json({
            message: 'Token could not be authenticated'
          });
        } else {
          req.user = user;
          //console.log(req.decoded);
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
