var express = require('express');
var router = express.Router();

var Users = require('../controllers/controllers.user');

var Recipes = require('../controllers/controllers.recipe');

module.exports = function(router) {

  router.route('/users')
    .post(Users.createUsers)
    .get(Users.getUsers);

  router.route('/users/login')
    .post(Users.userLogin);

  router.route('/users/:user_id/recipes')
    .get(Users.getUserRecipes);

  router.route('/users/:user_id')
    .delete(Users.deleteUser)
    .get(Users.getAUser);

  router.get('/me', Users.verifyToken, Users.getMe);

  router.get('/', Recipes.getAllRecipes);

  router.route('/recipes')
    .post(Users.verifyToken, Recipes.uploadImage, Recipes.createRecipe)
    .get(Recipes.getAllApprovedRecipes);

  router.route('/recipes/:recipe_id')
    .get(Recipes.getOneRecipe)
    .post(Recipes.uploadImage, Recipes.updateRecipe)
    .delete(Recipes.deleteRecipe);

  router.route('/recipes/:recipe_id/approve')
    .put(Recipes.approveRecipe);
    
  router.route('/recipes/:recipe_id/like')
    .post(Recipes.likeRecipe);
    
};
