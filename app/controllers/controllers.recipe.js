var Recipe = require('../models/models.recipe');

module.exports = {
  /**
   * [getApi welcomes you to the recipe api]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getApi: function(req, res) {
    res.json({
      message: 'Welcome to the recipe api!'
    });
  },
  /**
   * [getAllRecipes gets all recipes that have been approved]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getAllRecipes: function(req, res) {
    Recipe.find({
      approved: true
    }).exec(function(err, recipes) {
      if (err)
        res.send(err);
      res.json(recipes);
    });
  },
  /**
   * [getOneRecipe gets a selected recipe]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getOneRecipe: function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      if (err)
        res.send(err);
      res.json(recipe);
    });
  },
  /**
   * [approveRecipe allows admin approve a post before all users see it]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  approveRecipe: function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      if (err)
        res.send(err);
      recipe.approved = true;
      recipe.save(function(err) {
        if (err)
          res.send(err);
        res.json({
          message: 'Recipe approved!'
        });
      });
    });
  },

  /**
   * [createRecipe allows user post a recipe]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  createRecipe: function(req, res) {
    var recipe = new Recipe(req.body);
    // recipe.name = req.body.name;
    // recipe.prepTime = req.body.prepTime;
    // recipe.cookTime = req.body.cookTime;
    // recipe.ingredients = req.body.ingredients;
    // recipe.method = req.body.method;
    recipe.user = req.body.user;
    recipe.save(function(err) {

      if (err)
        res.send(err);
      res.json({
        message: 'Recipe created!',
        data: recipe
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
