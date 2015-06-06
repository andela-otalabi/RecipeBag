var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * [UserSchema describes the user collection]
 * @type {Schema}
 */
var CommentsSchema = new Schema({
  text: {
    type: String
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }
});

module.exports = mongoose.model('Comments', CommentsSchema);