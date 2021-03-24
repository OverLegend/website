const passport = require("passport");
const discordStrategy = require("passport-discord").Strategy;
const User = require("../utils/models/User");
const Minecraft = require("../utils/models/Minecraft");

passport.serializeUser((user, done) => done(null, user.discordId));

passport.deserializeUser(async (discordId, done) => {
  try {
    const user = await User.findOne({discordId});
    return user ? done(null, user) : done(null, null);
  } catch(err) {done(err, null);}
});

passport.use(new discordStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL
}, async (access, refresh, profile, done) => {
  const {id, username, discriminator, avatar} = profile;
  try {
    const findUser = await User.findOneAndUpdate({ discordId: id }, {
      discordTag: `${username}#${discriminator}`,
      avatar,
      accessToken: access,
      refreshToken: refresh
    }, {new: true});


    if (findUser) {
      const mc = await Minecraft.findOne({discordId: id});

      if (mc && mc.isJoined) {
        findUser.nickname = mc.nickname;
      }

      return done(null, findUser); 

    } else {
      const newUser = await User.create({
        discordId: id,
        discordTag: `${username}#${discriminator}`,
        avatar,
        accessToken: access,
        refreshToken: refresh
      });

      const mc = await Minecraft.findOne({discordId: id});

      if (mc && mc.isJoined) {
        newUser.nickname = mc.nickname;
      }

      return done(null, newUser);
    }
  } catch(err) {return done(err, null);}
}));