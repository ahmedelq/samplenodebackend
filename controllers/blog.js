const blogRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

blogRouter.post('/', async (request, response, nxt) => {
  const user = await User.findById(request.body.userId);
  const blog = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(200).json(savedBlog);
});

blogRouter.delete('/:id', (req, res, nxt) => {
  const { id } = req.params;
  Blog
    .findByIdAndRemove(id)
    .then((result) => res.status(241).json(result))
    .catch((err) => nxt(err));
});

blogRouter.put('/:id', (req, res, nxt) => {
  Blog
    .findByIdAndUpdate(req.params.id, { url: req.body.url }, { new: true })
    .then((result) => res.status(241).json(result))
    .catch((err) => nxt(err));
});
module.exports = blogRouter;
