require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const fsPromise = require("fs").promises;
// const path = require("path");
// let userDB = require("../DB/users.json");
// const mutatingUserDB = (data) => {
//   userDB = data;
// };
const userMDB = require("../DB/user-mongo");

const authExistingUser = async (req, res) => {
  const user = {
    email: req.body.email,
    pwd: req.body.pwd,
    loggedIn: req.body.loggedIn,
  };
  if (!user.email || !user.pwd) return res.status(400).json({ message: "email and password are required" });

  await userMDB.findOne({ email: user.email }).then(async (existingUser) => {
    if (!existingUser)
      return res
        .status(401)
        .json({ message: "Not a valid email and password." });
    const authUser = async () => await bcrypt.compare(user.pwd, existingUser.pwd);
    if(!authUser) return res.status(404).json({message: "User not found"})
          const accessToken = jwt.sign(
            { username: existingUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
          );
          const refreshToken = jwt.sign(
            { username: existingUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          await userMDB.findOneAndUpdate(
            { email: existingUser.email },
            { refreshToken, loggedIn: user.loggedIn },
            { new: true }
          );
          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 100,
            secure: true,
          });
          const loggedInUser = {
            name: existingUser.name,
            gender: existingUser.gender,
            country: existingUser.country,
            email: existingUser.email,
            loggedIn: user.loggedIn,
            token: accessToken,
          };
          return res.status(201).json(loggedInUser);
      })
      .catch(async (error) => {
        // console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
      });
    }

module.exports = { authExistingUser };
