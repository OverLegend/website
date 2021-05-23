const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
      required: true,
      unique: true,
    },
    requestExpireDate: {
      type: String,
      required: true,
    },
    isJoined: {
      type: Boolean,
      required: true,
      default: false,
    },
    minecraft: {
      type: Object,
    },
  },
  { collection: "discordrequests" }
);

module.exports = mongoose.model("Requests", RequestSchema);
