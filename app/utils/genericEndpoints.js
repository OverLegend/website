const Minecraft = require("../utils/models/Minecraft");
const cors = require("cors");

module.exports = (app, conn) => {

  app.post("/api/minecraft/players", cors(), async (req, res) => {
    console.log("A");
    if (req.body.isOnline) {
      let request = await Minecraft.findOne({nickname: req.body.playerName});
      console.log("B");
      if (!request.isJoined) {
        console.log("C");
        request.update({isJoined: true}, {new: true});
        await request.save();
      }
    }

    res.end();
  });

  app.get("/api/top_parkour", (req,res) => {
    conn.query("USE ajparkour; SELECT * FROM ajparkour_scores;", [1,2], (err,data) => {
      if (err) throw err;
      res.json(data[1]);
    });
  })
  
  app.get("/api/bans", (req,res) => {
    conn.query("USE litebans; SELECT * FROM litebans_bans; SELECT * FROM litebans_history;", [1,2,3], (err,data) => {
      if (err) throw err;
      res.json({data: data[1], history: data[2]});
    });
  });
  
  app.get("/api/mutes", (req,res) => {
    conn.query("USE litebans; SELECT * FROM litebans_mutes; SELECT * FROM litebans_history;", [1,2,3], (err,data) => {
      if (err) throw err;
      res.json({data: data[1], history: data[2]});
    });
  });
  
  app.get("/api/warns", (req,res) => {
    conn.query("USE litebans; SELECT * FROM litebans_warnings; SELECT * FROM litebans_history;", [1,2,3], (err,data) => {
      if (err) throw err;
      res.json({data: data[1], history: data[2]});
    });
  });
  
  app.get("/api/staff", (req,res) => {
    conn.query("USE luckperms_bungeecord; SELECT * FROM bungeecord_players;", [1,2], (err,data) => {
      if (err) throw err;
      res.json(data[1]);
    });
  });
}