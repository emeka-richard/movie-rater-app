const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// let userDB = require("../DB/users.json");
// const mutateUserDB = (data) => (userDB = data);
const userMDB = require("../DB/user-mongo");

const addNewUser = async (req, res) => {
  const user = {
    name: req.body.name,
    country: req.body.country,
    email: req.body.email,
    pwd: req.body.pwd,
    loggedIn: req.body.loggedIn,
  };
  if (!user.email || !user.country || !user.name || !user.pwd) {
    return res.status(400).json({ message: "username and password required!" });
  }
  await userMDB
    .findOne({ email: user.email })
    .then(async (conflictinguser) => {
      if (conflictinguser) return res.sendStatus(409);
      const hashedPWD = await bcrypt.hash(user.pwd, 10);
      const accessToken = jwt.sign(
        { username: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        { username: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const hashedUser = {
        name: user.name,
        country: user.country,
        email: user.email,
        loggedIn: user.loggedIn,
        pwd: hashedPWD,
        refreshToken,
      };
      const registeredUser = {
        name: user.name,
        email: user.email,
        country: user.country,
        loggedIn: user.loggedIn,
        accessToken,
      };
      await userMDB.create(hashedUser);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).json(registeredUser);
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
};

module.exports = { addNewUser };
