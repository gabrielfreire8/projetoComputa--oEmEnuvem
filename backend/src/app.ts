const express = require('express');
const routers = require('./routers/router')
const app = express();
const cors = require("cors");

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use('/', routers)
app.use(cors({
    origin: '*'
}));


module.exports = app