var Comment = require('../models/models.comments');
var Recipe = require('../models/models.recipe');

module.exports = {
  /**
   * [getUsers shows all comments]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getAllComments: function(req, res, next) {
    Comment.find(function(err, comments) {
      if (err) {
        res.json({
          message: 'Error getting comments.'
        });
      }
      if (comments) {
        res.json(comments);
      }
      next();
    });
  },

  getRecipeComments: function(req, res, next) {
    Comment.find({
      recipe: req.params.recipe_id
    }, function(err, comments) {
      if (err) {
        res.json({
          message: 'Error getting comments.'
        });
      }
      if (comments) {
        res.json(comments);
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
  addComment: function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, user) {
      var comment = new Comment(req.body);
      /*comment.text = req.body.text;
      comment.by = req.body.by;*/
      comment.recipe = req.params.recipe_id;
      comment.save(function(err) {
        if (err)
          res.send(err);
        res.json({
          message: 'comment added!',
          data: comment
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
  deleteComment: function(req, res) {
    Comment.remove({
      _id: req.params.comment_id
    }, function(err, comment) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  }
};
