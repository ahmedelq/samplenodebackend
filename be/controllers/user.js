const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

userRouter.post('/', async (req, res, nxt) => {
  const passwd = await bcrypt.hash(req.body.password, 10);
  new User({ ...req.body, passwdHashed: passwd })
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => nxt(err));
});

userRouter.get('/', (req, res, nxt) => {
  User
    .find({})
    .populate('blogs', { title: 1, date: 1 })
    .then((result) => res.status(200).json(result))
    .catch((err) => nxt(err));
});
module.exports = userRouter;
