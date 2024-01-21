const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const verifyJWT = require("./middlewares/verifyJWT")
const loginRouter = require("./routes/loginRoute")
const registerRouter = require("./routes/registerRoute")
const collectionsRouter = require("./routes/collectionsRoute")
const refreshTokenRouter = require("./routes/refreshTokenRoute")
const logoutRouter = require("./routes/logoutRoute")
const corsOptions = require("./configs/corsOptions")
const { eventLogger } = require("./middlewares/eventLogger")
const { errorHandler } = require("./middlewares/errorHandler")
// const { mongoConnect } = require('./services/mongo');

// const PORT = process.env.PORT || 8000;

app.use(eventLogger)
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


app.use("/register", registerRouter)
app.use("/login", loginRouter)
app.use("/refresh", refreshTokenRouter)
app.use("/logout", logoutRouter)

app.use(verifyJWT)
app.use("/movies", collectionsRouter)

app.all("/*", (req, res)=>{
    res.status(404).json({message: "404 Not Found"})
})

// app.use('/v1', api);

app.use(errorHandler)

module.exports = app
