const { loggerFXN } = require("./eventLogger")


const errorHandler = (err, req, res, next)=>{
    loggerFXN(`${err.name} \t ${err.message}`, "errLog.txt")
    console.error(err.stack, err.message)
    res.status(500).send(err.message)
}

module.exports = { errorHandler }