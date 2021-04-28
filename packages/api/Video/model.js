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
      maxlength: 200,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
    },
    dislikes: {
      type: Number,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Video",videoSchema);
