const express = require('express');
const routers = require('./routers/router')
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use('/', routers)



module.exports = app