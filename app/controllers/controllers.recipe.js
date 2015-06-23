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

  /**
   * [getAllRecipes gets all recipes that have been approved]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getAllApprovedRecipes: function(req, res) {

    if (!req.query.sort) {
      Recipe.find({
        approved: true
      }).populate('user').exec(function(err, recipes) {
        if (err)
          res.send(err);
        res.json(recipes);
      });
    } else {
      Recipe.find({
        approved: true
      }).populate('user').sort({
        likes_count: 'desc'
      }).exec(function(err, recipes) {
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
  /**
   * [likeRecipe lets a user like a recipe]
   * @param  {[req]} 
   * @param  {[res]} 
   * @return {[void]}
   */
  // likeRecipe: function(req, res) {
  //   Recipe.findById(req.params.recipe_id, function(err, recipe) {
  //     if (err)
  //       res.send(err);
  //     recipe.likes += 1;
  //     recipe.save(function(err) {
  //       if (err)
  //         res.send(err);
  //       res.json({
  //         message: 'Thanks for liking',
  //         data: recipe
  //       });
  //     });
  //   });
  // },
  // 
 
    likeRecipe: function(req, res) {
      var recipe = req.body;

      Recipe.update( 
        { _id: req.params.recipe_id}, 
        { $set: {
            name: req.body.name,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            method: req.body.method,
            imageLink: req.body.imageLink,
            ingredients: req.body.ingredients,
            approved: req.body.approved, 
            user: req.body.user, 
            likes: req.body.likes,
            likes_count: req.body.likes.length  
          }
        }, 
        function(err, data) {
          if(err) {
            res.status(400).send({
              message: err
            });
            return;
          } 
          else {
            res.json(recipe);
          }
        }
      )
    },

  // likeRecipe: function(req, res) {
  //   var recipe = req.recipe,
  //     like = req.body;
  //   like.user = req.user;
  //   var hasLiked = false;

  //   console.log(req, 'hhrhr');
  //   for (var i = 0; i < recipe.likes.length; i++) {
  //     if (req.user.id === recipe.likes[i].user.toString()) {
  //       hasLiked = true;
  //       break;
  //     }
  //   }
  //   if (!hasLiked) {
  //     recipe.likes.push(like);

  //     recipe.save(function(err) {
  //       if (err) {
  //         return res.status(400).send({
  //           message: errorHandler.getErrorMessage(err)
  //         });
  //       } else {
  //         res.jsonp(recipe);
  //       }
  //     });
  //   } else {
  //     return res.send(400, {
  //       message: 'you have already liked this recipe before'
  //     });
  //   }
  // },

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
  /**
   * [uploadImage description]
   * @param  {[req]}   req  
   * @param  {[res]}   res  
   * @param  {Function next} 
   * @return {[void]}        
   */
  uploadImage: function(req, res, next) {
    console.log(req.files);
    if (req.files.file) {
      cloudinary.uploader.upload(req.files.file.path, function(result) {
        if (result.url) {
          req.imageLink = result.url
          next()
        } else {
          res.json({
            error: 'You need to upload a picture to create the recipe, Please make sure you are connected to the internet to upload a picture'
          });
        }
      });
    } else {
      next()
    }
  },

  /*
   * [updateRecipe description]
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  updateRecipe: function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      req.data = JSON.parse(req.body.data);

      if (err)
        res.send(err);
      recipe.name = req.data.data.name;
      recipe.prepTime = req.data.data.prepTime;
      recipe.cookTime = req.data.data.cookTime;
      recipe.ingredients = req.data.data.ingredients;
      recipe.method = req.data.data.method;
      recipe.user = req.data.data.user;
      if (req.imageLink) {
        recipe.imageLink = req.imageLink;
      }
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
