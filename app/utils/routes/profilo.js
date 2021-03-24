const router = require("express").Router();

router.get("/", (req, res) => {

  require("../../utils/refreshUserObject")(req);

  if (req.isAuthenticated()) {
    let { discordId, discordTag, avatar, nickname} = req.user;
    dataToCarry = {
      discordId: discordId,
      discordTag: discordTag,
      avatar: avatar,
      minecraft: nickname,
      isLogged: true
    }

    res.render("profilo", dataToCarry);
  } else {
    res.redirect("/login");
  }
});

module.exports = router;