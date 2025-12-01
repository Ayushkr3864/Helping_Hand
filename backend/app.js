var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { METHODS } = require('http');

var app = express();
const corsOptions = {
  origin: [
    "https://helping-hand-inky.vercel.app",
    "http://10.150.119.122:5173",
    "http://localhost:5173",
    "capacitor://localhost",
    "https://localhost",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
