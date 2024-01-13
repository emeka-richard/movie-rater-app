const fs = require("fs")
const fsPromises = require("fs").promises
const path = require("path")
const { format } = require("date-fns")
const { v4:uuidv4 } = require("uuid")

const loggerFXN = async (message, logName)=>{
    const logDate = `${ format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${logDate} \t ${uuidv4()} \t ${message} \n`
    try {
        if(!fs.existsSync(path.join(__dirname, "..", "logs", ))) await fsPromises.mkdir(path.join(__dirname, "..", "logs"))
        await fsPromises.appendFile(path.join(__dirname, "..", "logs", logName), logItem)
    } catch (error) {
        throw new Error(error)
    }
}

const eventLogger = async (req, res, next)=>{
    loggerFXN(`${req.method} \t ${req.headers.origin} \t ${req.url}`, "loggedEvent.txt")
    next()
}

module.exports = { loggerFXN, eventLogger }