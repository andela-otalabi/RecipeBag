var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * [RecipeSchema description]
 * @type {Schema}
 */
var RecipeSchema = new Schema({
  name: {
    type: String
  },
  approved: {
    type: Boolean,
    default: false
  },
  category: {
    type: String
  },
  prepTime: {
    type: String
  },
  cookTime: {
    type: String
  },
  ingredients: [{
    type: String
  }],
  method: [{
    type: String
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
