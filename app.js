const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config.js');
const blogRoute = require('./controllers/blog.js');
const userRouter = require('./controllers/user.js');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRoute);
app.use('/api/user', userRouter);

const errHandler = (err, req, res, nxt) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: 'invalid input' });
  } else {
    console.log(err);
    res.status(500).end();
  }
};
const endpointErr = (req, res) => {
  res.status(404).json({ error: 'can not find the specified URL' });
};
app.use(errHandler);
app.use(endpointErr);

module.exports = app;
