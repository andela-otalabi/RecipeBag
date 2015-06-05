var Comment = require('../models/models.comments');
var Recipe = require('../models/models.recipe');

module.exports = {
  /**
   * [getUsers shows all comments]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getAllComments: function(req, res) {
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      res.json(comments);
    });
  },

  /**
   * [createUsers allows user to register]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  addComment: function(req, res) {
    var comment = new Comment();
    comment.text = req.body.text;
    comment.by = req.body.by;
    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({
        message: 'comment added!',
        data: comment
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
