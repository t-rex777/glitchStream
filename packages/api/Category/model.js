const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = mongoose.Schema(
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
    videos: {
      type: ObjectId,
      ref: "Video",
      maxlength: 20,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
