const Minecraft = require("../utils/models/Minecraft");
const cors = require("cors");
const path = require("path");

module.exports = (app, conn) => {
  app.get("/server-info.yml", (req, res) => {
    res.sendFile(path.join(__dirname, "server-info.yml"));
  });

  app.post("/api/minecraft/players", cors(), async (req, res) => {
    if (req.body.type == "join") {
      let request = await Minecraft.findOne({ "minecraft.nickname": req.body.player - name });
      if (request != null && !request.isJoined) {
        await Minecraft.findOneAndUpdate({ "minecraft.nickname": req.body.player - name }, { isJoined: true }, { new: true });
      }
    }

    res.end();
  });

  app.get("/api/top_parkour", (req, res) => {
    conn.query("USE ajparkour; SELECT * FROM ajparkour_scores;", [1, 2], (err, data) => {
      if (err) throw err;
      res.json(data[1]);
    });
  });

  app.get("/api/bans", (req, res) => {
    conn.query("USE litebans; SELECT * FROM litebans_bans; SELECT * FROM litebans_history;", [1, 2, 3], (err, data) => {
      if (err) throw err;
      res.json({ data: data[1], history: data[2] });
    });
  });

  app.get("/api/mutes", (req, res) => {
    conn.query("USE litebans; SELECT * FROM litebans_mutes; SELECT * FROM litebans_history;", [1, 2, 3], (err, data) => {
      if (err) throw err;
      res.json({ data: data[1], history: data[2] });
    });
  });

  app.get("/api/warns", (req, res) => {
    conn.query("USE litebans; SELECT * FROM litebans_warnings; SELECT * FROM litebans_history;", [1, 2, 3], (err, data) => {
      if (err) throw err;
      res.json({ data: data[1], history: data[2] });
    });
  });

  app.get("/api/staff", (req, res) => {
    conn.query("USE luckperms_bungeecord; SELECT * FROM bungeecord_players;", [1, 2], (err, data) => {
      if (err) throw err;
      res.json(data[1]);
    });
  });
};
