const http = require('http');
require("dotenv").config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  try {
    await mongoConnect();
    
    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  
  } catch (error) {
    console.error(error)
  }
}

startServer();