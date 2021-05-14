const router = require("express").Router();

router.get("/", (req, res) => {
  require("../../utils/refreshUserObject")(req);

  let dataToCarry = {};
  let isLogged = false;
  if (req.isAuthenticated()) {
    isLogged = true;
    let { discordId, discordTag, avatar, nickname } = req.user;
    dataToCarry = {
      discordId: discordId,
      discordTag: discordTag,
      avatar: avatar,
      minecraft: nickname,
      page: "partials/wiki/main",
    };
  }
  dataToCarry.isLogged = isLogged;
  res.render("wiki", dataToCarry);
});

router.get("/:page", (req, res) => {
  require("../../utils/refreshUserObject")(req);

  let dataToCarry = {};
  let isLogged = false;
  if (req.isAuthenticated()) {
    isLogged = true;
    let { discordId, discordTag, avatar, nickname } = req.user;
    dataToCarry = {
      discordId: discordId,
      discordTag: discordTag,
      avatar: avatar,
      minecraft: nickname,
      page: "partials/wiki/" + req.params.page,
    };
  }
  dataToCarry.isLogged = isLogged;
  res.render("wiki", dataToCarry);
});

module.exports = router;
