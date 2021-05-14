const User = require("../utils/models/User");
const Minecraft = require("../utils/models/Minecraft");
const fetch = require("node-fetch");

module.exports = async (req) => {
  if (req.user) {
    const fetchDiscordUserInfo = await fetch("http://discordapp.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
      },
    });

    const newUserObj = await fetchDiscordUserInfo.json();
    const newUser = await User.findOneAndUpdate(
      { discordId: newUserObj.id },
      {
        discordTag: `${newUserObj.username}#${newUserObj.discriminator}`,
        avatar: newUserObj.avatar,
      },
      { new: true }
    );

    const mc = await Minecraft.findOne({ discordId: newUserObj.id });

    if (mc && mc.isJoined) {
      newUser.nickname = mc.nickname;
    }

    if (newUser) {
      newUser.save((err) => {
        if (err) throw err;

        req.login(newUser, (err) => {
          if (err) throw err;
        });
      });
    }
  }
};
