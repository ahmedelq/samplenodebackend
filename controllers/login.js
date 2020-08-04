const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

loginRouter.post('/', async (req, res, nxt) => {
  const { body } = req;
  const user = await User.findOne({ username: body.username });
  const isPassValid = user !== null && await bcrypt.compare(body.password, user.passwdHashed);
  if (!isPassValid) {
    return res.status(401).json({ error: 'invalid credintials' });
  }
  const userToken = {
    username: user.username,
    id: user._id,
  };
  const jwtToken = jwt.sign(userToken, process.env.SECRET);
  res.status(200).json({ token: jwtToken, username: user.username, name: user.name });
});

module.exports = loginRouter;
