require("dotenv").config();

const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
const fetch = require("node-fetch");

const conn = require("./config/mysqlConnector");

require("./config/discordStrategy");
require("./config/mongoConnector")(mongoose);
require("./config/expressMiddlewares")(app);
require("./utils/routesAliases")(app);
require("./utils/authEndpoints")(app);
require("./utils/genericEndpoints")(app, conn);

const routes = ["home", "modalita", "punizioni/*", "regole", "staff", "error", "profilo"];

routes.forEach(route => {
  app.use(`/${route}`, require(`./utils/routes/${route.includes("/") ? route.split("/")[0] : route}`));
});

app.get("/*", (req, res) => { res.statusCode = 404; res.redirect("/error") });

app.listen(5000, () => {
  console.clear();
  console.log(`[SERVER] online: https://overlegend.it/home`);
});