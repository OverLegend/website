const passport = require("passport");
const MongoStore = require('connect-mongo');
const session = require("express-session");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");

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

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, "/../theme/public")));

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname + "/../theme/views"));
}