var Recipe = require('../models/models.recipe');
var cloudinary = require('cloudinary');

module.exports = {
  /**
   * [getAllRecipes gets all recipes]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getAllRecipes: function(req, res) {
    Recipe.find(function(err, recipes) {
      if (err)
        res.send(err);
      res.json(recipes);
    });
  },

  // getAll: function(req, res) {
  //   res.sendfile('./public/index.html');
  // },
  /**
   * [getAllRecipes gets all recipes that have been approved]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getAllApprovedRecipes: function(req, res) {

    if(!req.query.sort) {
      Recipe.find({
        approved: true
      }).exec(function(err, recipes) {
        if (err)
          res.send(err);
        res.json(recipes);
      });
    } else {
      Recipe.find({
        approved: true
      }).sort({ likes: 'desc' }).exec(function(err, recipes) {
        if (err)
          res.send(err);
        res.json(recipes);
      });
    }
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

  likeRecipe: function(req, res){
    Recipe.findById(req.params.recipe_id, function(err, recipe){
      if(err)
        res.send(err);
      recipe.likes += 1; 
      recipe.save(function(err){
        if (err)
          res.send(err);
        res.json({
          message: 'Thanks for liking',
          data: recipe
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
    var recipe = new Recipe(req.data.data);
    recipe.imageLink = req.imageLink;
    recipe.user = req.user.id;
    recipe.save(function(err) {
      if (err)
        res.json(err);
      res.json({
        message: 'Your recipe has been saved, and will be visible after approval',
        data: recipe
      });
    });
  },

  uploadImage: function(req, res, next) {
    console.log(req.files);
    cloudinary.uploader.upload(req.files.file.path, function(result) {
      console.log('sagsdgasdgsasdgadse', result.url);
      if (result.url) {
        req.imageLink = result.url
        next()
      } else {
        res.json({
          error: 'You need to upload a picture to create the recipe, Please make sure you are connected to the internet to upload a picture'
        });
      }
    })
  },
  /*
   * [updateRecipe description]
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  updateRecipe: function(req, res) {
    console.log(req.imageLink);
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      //console.log(req.body);
      req.data = JSON.parse(req.body.data);
       
      if (err)
        res.send(err);
      //recipe.imageLink = req.imageLink;
      recipe.name = req.data.data.name;
      recipe.prepTime = req.data.data.prepTime;
      recipe.cookTime = req.data.data.cookTime;
      recipe.ingredients = req.data.data.ingredients;
      recipe.method = req.data.data.method;
      recipe.user = req.data.data.user;
      recipe.imageLink = req.imageLink;
      recipe.save(function(err) {
        if (err)
          res.send(err);
        res.json({
          message: 'Recipe updated!',
          data: recipe
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
