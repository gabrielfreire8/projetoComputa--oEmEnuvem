require('dotenv').config();

const app = require('./src/app');

app.listen(process.env.API_PORT, () => console.log("API RODANDO ", process.env.API_PORT));
