var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * [RecipeSchema description]
 * @type {Schema}
 */
var RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
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
  imageLink: String,
  likes: {
    type: Number,
    default: 0
  },
  method: [{
    type: String
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
