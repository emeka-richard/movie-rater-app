const express = require("express");
const logoutRouter = express.Router()
const logoutController = require("../controllers/logoutController");

logoutRouter.post('/', logoutController.logoutExistingUser)

module.exports = logoutRouter