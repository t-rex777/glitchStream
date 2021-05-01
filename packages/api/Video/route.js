const express = require("express");
const {
  getVideoById,
  getVideos,
  createVideo,
  getOneVideo,
  updateVideo,
  deleteVideo,
} = require("./controller");
const router = express.Router();

router.param("videoId", getVideoById);

router.route("/video").get(getVideos).post(createVideo);

router
  .route("/video/:videoId")
  .get(getOneVideo)
  .post(updateVideo)
  .delete(deleteVideo);

module.exports = router;
