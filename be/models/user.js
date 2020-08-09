const mongoose = require('mongoose');
const uv = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String, unique: true, minLen: 3, required: true,
  },
  passwdHashed: { type: String, required: true },
  name: { type: String, required: true },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }],

});

userSchema.plugin(uv);
userSchema.set('toJSON', {
  transform: (doc, obj) => {
    delete obj.passwdHashed;
  },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
