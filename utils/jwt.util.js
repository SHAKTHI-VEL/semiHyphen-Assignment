const jwt = require('jsonwebtoken');
require('dotenv').config()
const TokenSecret=process.env.JWT_SECRET

const createAccessToken = (user) => {
  return jwt.sign({ user },TokenSecret)
}

const decodeAccessToken = (token) => {
  return jwt.verify(token, TokenSecret)
}

module.exports = { createAccessToken, decodeAccessToken };