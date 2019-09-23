const dotenv = require('dotenv');

if (!process.env.NODE_ENV) {
  let result = dotenv.config();
  if (result.error) {
    console.log(result.error);
  }
}

const express = require('express');
const server = express();
const router = require('./routes');
server.use(router);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}...`);
});
