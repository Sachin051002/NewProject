const jwt = require('jsonwebtoken')
const { jwt_secretToken } = require('../config/env');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).send({ mssg: "Token not provided" })

    }

    jwt.verify(token, jwt_secretToken, async (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).send({ msg: "Token has expired." })
        } else {
          return res.status(401).send({ mssg: "Failed to authenticate the token." })
        }
      }
      req.user = user;
      // console.log('adsfj;')
      next();
    })


  }
  catch (e) {
    res.status(500).send(e);
  }
}