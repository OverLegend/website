const User = require("../utils/User");
const fetch = require("node-fetch");

module.exports = async (req) => {

    if (req.user) {
        const fetchDiscordUserInfo = await fetch('http://discordapp.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${req.user.accessToken}`,
            }
        });

        const newUserObj = await fetchDiscordUserInfo.json();
        const newUser = await User.findOneAndUpdate({discordId: newUserObj.id}, {
            discordTag: `${newUserObj.username}#${newUserObj.discriminator}`,
            avatar: newUserObj.avatar
        }, {new: true});

        newUser.save((err) => {
            if (err) throw err;
            
            req.login(newUser, (err) => {
                if (err) throw err;
            });
        });
    }
}