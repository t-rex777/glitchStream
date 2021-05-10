const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    playlists: [
      { 
        name: String,
        videos: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            unique: true,
          },
        ],
      },
    ],
    suscriptions: [
      {
        type: String,
        unique: true,
      },
    ],
    likedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        unique: true,
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        unique: true,
        maxLength : 8
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);

// POST: api.com/history/:userId/:videoId

// let user = User.findById(userId);
// user = lodash.extend(user, { history: lodash.concat(user.history, videoId) });
// user.save();
