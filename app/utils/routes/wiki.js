const router = require("express").Router();

router.get("/wiki/skyblock", (req, res) => {
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
      page: "skyblock",
    };
  }
  dataToCarry.isLogged = isLogged;
  res.render("wiki", dataToCarry);
});

module.exports = router;
