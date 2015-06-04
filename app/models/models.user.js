var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * [UserSchema describes the user collection]
 * @type {Schema}
 */
var UserSchema = new Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
  