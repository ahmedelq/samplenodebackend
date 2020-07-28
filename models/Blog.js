const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});
blogSchema.set('toJSON', {'transform': (doc, blg) => {
    blg['id'] = blg._id.toString();
    delete blg._id;
    delete blg.__v;
    console.log(blg);
}});
const Blog = mongoose.model('Blog', blogSchema);



module.exports = Blog;

