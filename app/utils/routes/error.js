const router = require("express").Router();

router.get("/", (req, res) => {

  require("../../utils/refreshUserObject")(req);

  let enabledCodes = [404, 401, 502]
  
  if (enabledCodes.includes(req.statusCode)) {
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
    res.render("error", dataToCarry);
  }
});

module.exports = router;