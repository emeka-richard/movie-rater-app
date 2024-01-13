// const whitelist = [ 'http://localhost:5173', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const whitelist = [ 'http://localhost:5173' ];
const corsOptions = {
    origin: (origin, callback)=>{
        whitelist.indexOf(origin) !== -1 || !origin ? callback(null, true) : callback(new Error('Not Allowed!'))
    },
    optionsSuccessStatus: 200 
}

module.exports = corsOptions;