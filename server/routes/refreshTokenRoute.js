const express = require("express");
const refreshTokenRouter = express.Router()
const refreshTokenController = require("../controllers/refreshTokenController");

refreshTokenRouter.get('/', refreshTokenController.handleRefreshToken)

module.exports = refreshTokenRouter