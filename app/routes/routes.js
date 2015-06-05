var express = require('express');
var router = express.Router();

var Users = require('../controllers/controllers.user');

var Recipes = require('../controllers/controllers.recipe');

var Comments = require('../controllers/controllers.comments');

module.exports = function(router) {
  router.route('/users')
    .post(Users.createUsers)
    .get(Users.getUsers);

  router.get('/', Recipes.getAllRecipes);

  router.route('/recipes')
    .post(Recipes.createRecipe)
    .get(Recipes.getAllApprovedRecipes);

  router.route('/recipes/:recipe_id')
    .get(Recipes.getOneRecipe)
    .put(Recipes.updateRecipe)
    .delete(Recipes.deleteRecipe);

  router.route('/recipes/:recipe_id/approve')
    .put(Recipes.approveRecipe);

  router.route('/users/:user_id/recipes')
    .get(Users.getUserRecipes);

  router.route('/users/:user_id')
    .delete(Users.deleteUser);

  router.route('/recipes/:recipe_id/comments')
    .get(Comments.getAllComments)
    .post(Comments.addComment);

  router.route('/recipes/comments/:comment_id')
    .delete(Comments.deleteComment);

  router.route('/users/login')
    .post(Users.userLogin);
};