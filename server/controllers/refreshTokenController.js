require("dotenv").config();
const fsPromises = require("fs").promises
const path = require("path")
const jwt = require("jsonwebtoken");
// let usersDB = require("../DB/users.json")
// const mutatingUserDB = (data)=> usersDB = data
const userMDB = require("../DB/user-mongo")


const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt )
    return res.sendStatus(401);
 const refreshToken = cookies.jwt;
 res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
 const existingdUser = userMDB.findOne({ refreshToken: refreshToken});

//   to avoide a hacker using the refresh token to create another access token
  if (!existingdUser){
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err) res.sendStatus(403)
            userMDB.findOneAndUpdate({ name: decoded.username }, {refreshToken: ""}).then((data)=>{

          })
            // const hackedUser = usersDB.forEach((hackeduser)=>{
            //     if(hackeduser.username === decoded.username){
            //         hackeduser.refreshToken = ""
            //     }
            // })
            // fsPromises.writeFile(path.join(__dirname, "..", "DB", "users.json"), JSON.stringify(usersDB))
        }
    )
    return res.sendStatus(401);
  } 

  jwt.verify(
    refreshToken, 
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded)=>{
        if(err || decoded.email !== existingdUser.email) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { "email": decoded.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        )
        const decodedUser = {
          name: decoded.name,
          email: decoded.email,
          country: decoded.country,
          loggedIn: decoded.loggedIn,
          accessToken
        }
        return res.json(decodedUser)
    }
  )
};

module.exports = { handleRefreshToken };
