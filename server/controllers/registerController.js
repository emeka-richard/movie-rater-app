const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// let userDB = require("../DB/users.json");
// const mutateUserDB = (data) => (userDB = data);
const userMDB = require("../DB/user-mongo")

const addNewUser = async (req, res) => {
  const user = {
    name: req.body.name,
    country: req.body.country,
    email: req.body.email,
    pwd: req.body.pwd,
    loggedIn: req.body.loggedIn
  };
  if (!user.email || !user.gender || !user.country || !user.name || !user.pwd) {
    return res.status(400).json({ message: "username and password required!" });
  }
  const conflictingUser = userMDB.find({ email: user.email})
  if (conflictingUser) return res.status(409).json({message: "Not a valid email."});
  try {
    const hashedPWD = await bcrypt.hash(user.pwd, 10);
    const hashedUser = {
      name: user.name,
      country: user.country,
      email: user.email,
      loggedIn: user.loggedIn,
      pwd: hashedPWD,
    };
    const accessToken = jwt.sign(
      { username: hashedUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    )
    const refreshToken = jwt.sign(
        {username: hashedUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    const newHashedUser = {...hashedUser, refreshToken}
    userMDB.create(newHashedUser)
    // mutateUserDB([...userDB, newHashedUser]);
    // fsPromises.writeFile(
    //   path.join(__dirname, "..", "DB", "users.json"),
    //   JSON.stringify(userDB)
    // );
    const registeredUser = {
      name: hashedUser.name,
      country: hashedUser.country,
      email: hashedUser.email,
      loggedIn: hashedUser.loggedIn,
      token: accessToken
    };
    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000})
    res.status(201).json(registeredUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addNewUser };
