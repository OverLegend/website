const passport = require("passport");
const MongoStore = require('connect-mongo');
const session = require("express-session");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = (app) => {
 
  app.set("view engine", "ejs");

  app.use(bodyParser());
  app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 30
    },
    store: MongoStore.create({
      mongoUrl: `${process.env.mongoURL}/sessions`
    })
  }));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  });

  app.options('*', (req, res) => {
    res.json({
      status: 'OK'
    });
  });

  app.use(cors());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, "/../theme/public")));

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname + "/../theme/views"));
}