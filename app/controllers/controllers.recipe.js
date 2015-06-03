var Recipe = require('../models/models.recipe');

module.exports = {
/**
 * [getApi description]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
  getApi: function(req, res) {
  res.json({
    message: 'Welcome to the recipe api!'
  });
  },
/**
 * [getAllRecipes description]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
  getAllRecipes: function(req, res) {
    Recipe.find(function(err, recipes) {
      if (err)
        res.send(err);
      res.json(recipes);
    });
  },
/**
 * [getOneRecipe description]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
  getOneRecipe: function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      if (err)
        res.send(err);
      res.json(recipe);
    });
  },

/**
 * [createRecipe description]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
  createRecipe: function(req, res) {
    var recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.prepTime = req.body.prepTime;
    recipe.cookTime = req.body.cookTime;
    recipe.ingredients = req.body.ingredients;
    recipe.method = req.body.method;
    recipe.user = req.body.user;
    recipe.save(function(err) {

      if (err)
        res.send(err);
      res.json({
        message: 'Recipe created!'
      });
    });
  },
/**
 * [updateRecipe description]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
  updateRecipe: function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      if (err)
        res.send(err);

      recipe.name = req.body.name;
      recipe.prepTime = req.body.prepTime;
      recipe.cookTime = req.body.cookTime;
      recipe.ingredients = req.body.ingredients;
      recipe.method = req.body.method;
      recipe.user = req.body.user;
      recipe.save(function(err) {
        if (err)
          res.send(err);
        res.json({
          message: 'Recipe updated!'
        });
      });
    });
  },
/**
 * [deleteRecipe description]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
  deleteRecipe: function(req, res) {
    Recipe.remove({
      _id: req.params.recipe_id
    }, function(err, recipe) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  }
};