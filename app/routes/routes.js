var express = require('express');
var router = express.Router();

var Users = require('../controllers/controllers.user');

var Recipes = require('../controllers/controllers.recipe');

module.exports = function(router) {
  router.route('/users')
    .post(Users.createUsers)
    .get(Users.getUsers);

  router.get('/', Recipes.getApi);

  router.route('/recipes')
    .post(Recipes.createRecipe)
    .get(Recipes.getAllRecipes);

  router.route('/recipes/:recipe_id')
    .get(Recipes.getOneRecipe)
    .put(Recipes.updateRecipe)
    .delete(Recipes.deleteRecipe);

  router.route('/recipes/:recipe_id/approve')
    .put(Recipes.approveRecipe);
};