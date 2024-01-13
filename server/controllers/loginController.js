require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromise = require("fs").promises;
const path = require("path");
// let userDB = require("../DB/users.json");
// const mutatingUserDB = (data) => {
//   userDB = data;
// };
const userMDB = require("../DB/user-mongo")

const authExistingUser = async (req, res) => {
  const user = {
    email: req.body.email,
    pwd: req.body.pwd,
    loggedIn: req.body.loggedIn,
  };
  if (!user.email || !user.pwd) {
    return res.status(400).json({ message: "email and password are required" });
  }
  const existingUser = userMDB.find({ email: user.email });
  // console.log(user, existingUser);

  if (!existingUser || undefined){
    return res.status(401).json({ message: "Not a valid email and password." });
  }

//   try {
    if (existingUser) {
      const authUser = await bcrypt.compare(user.pwd, existingUser.pwd);
      if (authUser) {
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
        const otherUsers = userDB.filter(
          (others) => others.pwd !== existingUser.pwd
        );
        // const currentAuthUser = {
        //   ...existingUser,
        //   refreshToken,
        //   loggedIn: user.loggedIn,
        // };
        userMDB.findOneAndUpdate({ email: existingUser.email }, {refreshToken, loggedIn: user.loggedIn}, {new: true}).then((data)=>{
          console.log(data)
        }).catch(error => {
          return res.status(401).json({})
        })
        // mutatingUserDB([...otherUsers, currentAuthUser]);
        // fsPromise.writeFile(
        //   path.join(__dirname, "..", "DB", "users.json"),
        //   JSON.stringify(userDB)
        // );
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        const loggedInUser = {
          name: existingUser.name,
          gender: existingUser.gender,
          country: existingUser.country,
          email: existingUser.email,
          loggedIn: user.loggedIn,
          token: accessToken,
        };
        res.status(201).json(loggedInUser);
      }
    }
//   } catch (error) {
//     return res.status(401).json({ message: error.message });
//   }
};

module.exports = { authExistingUser };
