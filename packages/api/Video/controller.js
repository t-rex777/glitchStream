const Video = require("./model");

// MIDDLEWARE
exports.getVideoById = async (req, res, next, videoId) => {
  try {
    const video = await Video.findById(videoId);
    req.video = video;
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// READ
exports.getOneVideo = async (req, res) => {
  try {
    const { video } = await req;
    res.send(video);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.json(videos);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// CREATE
exports.createVideo = async (req, res) => {
  try {
    await Video.insertMany([]);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// UPDATE
exports.updateVideo = async (req, res) => {
  try {
    const video = req.video;
    let updatedVideo = req.body;
    updatedVideo = extend(video, updatedVideo);
    await updatedVideo.save((err, vid) => {
      if (err) {
        res.status(400).json({
          message: "Error in updating video",
        });
      }
      res.json(vid);
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// DELETE
exports.deleteVideo = (req, res) => {
  try {
    const deleteVideo = req.video;
    deleteVideo.deleteOne((err, vid) => {
      if (err) {
        res.status(400).json({
          message: "Error in deleteing video",
        });
      }
      res.json(vid);
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
