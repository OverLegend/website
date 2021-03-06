const router = require("express").Router();

router.get("/", (req, res) => {

  require("../../utils/refreshUserObject")(req);

  let dataToCarry = {};
  let isLogged = false;
  if (req.isAuthenticated()) {
    isLogged = true;
    let { discordId, discordTag, avatar, nickname} = req.user;
    dataToCarry = {
      discordId: discordId,
      discordTag: discordTag,
      avatar: avatar,
      minecraft: nickname
    }
  }
  dataToCarry.isLogged = isLogged;
  res.render("punizioni", dataToCarry);
});

module.exports = router;