const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
blogSchema.set('toJSON', {
  transform: (doc, blg) => {
    blg.id = blg._id.toString();
    delete blg._id;
    delete blg.__v;
  },
});
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
