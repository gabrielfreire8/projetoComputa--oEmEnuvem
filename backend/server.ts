require('dotenv').config();

const server = require('./src/app.ts');

exports = server.listen(process.env.API_PORT, () => console.log("API RODANDO ", process.env.API_PORT));


