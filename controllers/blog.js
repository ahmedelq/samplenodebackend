const blogRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogRouter.post('/', async (request, response, nxt) => {
  const { token } = request;
  if (!token) response.status(401).json({ error: 'not allowed' });
  const user = await User.findById(token.id);
  const blog = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(200).json(savedBlog);
});

blogRouter.delete('/:id', async (req, res, nxt) => {
  const { id } = req.params;
  const { token } = req;
  const blog = await Blog.findById(id);
  if (blog.user.toString() === token.id) {
    blog.remove();
    res.status(241).end();
  } else {
    res.status(401).json({ error: 'not allowed' });
  }
});

blogRouter.put('/:id', (req, res, nxt) => {
  Blog
    .findByIdAndUpdate(req.params.id, { url: req.body.url }, { new: true })
    .then((result) => res.status(241).json(result))
    .catch((err) => nxt(err));
});
module.exports = blogRouter;
