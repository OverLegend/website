const router = require("express").Router();

router.get("/", (req, res) => {
  let dataToCarry = {};
  let isLogged = false;
  if (req.isAuthenticated()) {
    isLogged = true;
    let { discordId, discordTag, avatar} = req.user;
    dataToCarry = {
      discordId: discordId,
      discordTag: discordTag,
      avatar: avatar
    }
  }
  dataToCarry.isLogged = isLogged;
  res.render("regole", dataToCarry);
});

module.exports = router;