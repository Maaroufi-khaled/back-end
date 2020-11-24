const express = require('express');
const { getToken } = require('../util');
const User = require('../models/userModel');
const router = express.Router();

router.post('/signin', async (req, res) => {
  console.log('posted');
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      _name: signinUser.name,
      _email: signinUser.email,
      _isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: 'Invalid Email Or Password' });
  }
});
router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      _name: newUser.name,
      _email: newUser.email,
      _isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: 'Invalid User Data.' });
  }
});

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Khaled',
      email: 'khaled06@example.com',
      password: '1234',
      isAdmin: true,
    });

    const newUser = await user.save();

    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
module.exports = router;
