const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  requestExpireDate: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  isJoined: {
    type: Boolean,
    required: true,
    default: false
  }
}, {collection: "discordrequests"});

module.exports = mongoose.model("Requests", RequestSchema);