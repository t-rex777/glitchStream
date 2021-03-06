const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 400,
    },
    category: {
      type: String,
      required: true,
      maxlength: 20,
    },
    uploadedBy: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    }
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);
