var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');
/**
 * [UserSchema describes the user collection]
 * @type {Schema}
 */
var UserSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
  var user = this;
  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password'))
    next();
  // generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  var user = this;
  var pass = bcrypt.compareSync(password, user.password);
  return pass;
};

module.exports = mongoose.model('User', UserSchema);
