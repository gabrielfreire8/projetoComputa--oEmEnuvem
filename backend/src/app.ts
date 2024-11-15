const express = require('express');
const routers = require('./routers/router')
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser'); 


app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use('/', routers)
app.use(cors({ origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(cookieParser());


module.exports = app