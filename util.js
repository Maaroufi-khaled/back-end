const jwt = require('jsonwebtoken');
const config = require('./config');

exports.getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};
exports.isAuth = (req, res, next) => {
  console.log('1')
  const token = req.headers.authorization;
  if (token) {
    console.log('2')
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log('3')
        return res.status(401).send({ msg: 'Invalid Token' });
      }
      console.log('4')
      req.user = decode;
      next();
      return;
    });
  } else {
    console.log('5')
    return res.status(401).send({ msg: 'Token is not supplied.' });
  }

};
exports.isAdmin = (req, res, next) => {
  console.log('success')
  if (req.user && req.user.isAdmin) {

    return next();
  }
  return res.status(401).send({ msg: 'Asmin Token is not valid.' });
};
