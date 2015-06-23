var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * [RecipeSchema description]
 * @type {Schema}
 */

var LikeSchema = new Schema({
  likes: {
    type: Number,
    default:''
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

var RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
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
  imageLink: {
    type: String,
    default: 'img/logo.png'
  },
  method: [{
    type: String
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [],
  likes_count: {
    type: Number
  }
});



module.exports = mongoose.model('Recipe', RecipeSchema);
// module.exports = mongoose.model('Like', LikeSchema);
