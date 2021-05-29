const mongoose = require("mongoose");
const { createHmac } = require("crypto");

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
    encrypted_password: {
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
          },
        ],
      },
    ],
    suscriptions: [
      {
        type: String,
      },
    ],
    likedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        maxLength: 8,
      },
    ],
  },
  { timeStamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.encrypted_password = this.securePassword(password);
  })
  .get(function () {
    return _password;
  });

userSchema.methods = {
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return;
    }
    try {
      const secret = process.env.USER_SECRET;
      return createHmac("sha256", secret).update(plainPassword).digest("hex");
    } catch (error) {
      return;
    }
  },
  authenticate: function (plainPassword) {
    return this.encrypted_password === this.securePassword(plainPassword);
  },
};

module.exports = mongoose.model("User", userSchema);
