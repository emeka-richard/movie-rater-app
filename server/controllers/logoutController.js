const fsPromise = require("fs").promises;
const path = require("path");
// let usersDB = require("../DB/users.json");
// const mutatingUserDB = (data) => (usersDB = data);
const userMDB = require("../DB/user-mongo")

const logoutExistingUser = async (req, res) => {
  const cookies = req.cookies;
  const userData = req.body;

  // console.log(cookies);
  console.log(userData);

  if (!cookies?.jwt) {
    userMDB.findOneAndUpdate({ email: userData.email }, {loggedIn: false, refreshToken: ""})
    // const otherUsers = usersDB.filter((user) => user.email !== userData.email);
    // const currentUser = usersDB.find((user) => user.email === userData.email);
    // const loggedOutUser = {...currentUser, loggedIn: false, refreshToken: ""}
    // mutatingUserDB([...otherUsers, loggedOutUser]);
    // await fsPromise.writeFile(
    //   path.join(__dirname, "..", "DB", "users.json"),
    //   JSON.stringify(usersDB)
    // );
    // console.log(loggedOutUser);
    return res.status(204).json({ message: "user logged out" });
  }

  const refreshToken = cookies.jwt;
  const existingdUser = userMDB.findOne( { refreshToken: refreshToken});
  if (!existingdUser) {
    userMDB.findOneAndUpdate({ email: userData.email }, {loggedIn: false, refreshToken: ""})

    // const otherUsers = usersDB.filter((user) => user.email !== userData.email);
    // const currentUser = usersDB.find((user) => user.email === userData.email);
    // const loggedOutUser = {...currentUser, loggedIn: false, refreshToken: ""}
    // mutatingUserDB([...otherUsers, loggedOutUser]);
    // await fsPromise.writeFile(
    //   path.join(__dirname, "..", "DB", "users.json"),
    //   JSON.stringify(usersDB)
    // );
    // console.log(loggedOutUser);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000});
    return res.status(204).json({ message: "user logged out" });
  }
  // const otherUsers = usersDB.filter(
  //   (user) => user.email !== existingdUser.email
  // );
  // const currentUser = {...existingdUser, loggedIn: false, refreshToken: ""};
  // // const currentUser = {
  // //   name:  existingdUser.name,
  // //   email: existingdUser.email,
  // //   gender: existingdUser.gender,
  // //   country: existingdUser.country,
  // //   pwd: existingdUser.pwd,
  // //   loggedIn: false,
  // //   refreshToken: ""
  // // };
  // mutatingUserDB([...otherUsers, currentUser]);
  // await fsPromise.writeFile(
  //   path.join(__dirname, "..", "DB", "users.json"),
  //   JSON.stringify(usersDB)
  // );
  userMDB.findOneAndUpdate({ email: userData.email }, {loggedIn: false, refreshToken: ""})
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000});
  res.status(204).json({ message: "user logged out" });
};

module.exports = { logoutExistingUser };
