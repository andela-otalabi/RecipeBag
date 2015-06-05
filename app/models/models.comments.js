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
    type: String
  }
});

module.exports = mongoose.model('Comments', CommentsSchema);
