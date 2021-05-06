const express = require("express");
const {
  getUserById,
  signUp,
  signIn,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  updateUserLikedVideos,
  getAllLikedVideos,
} = require("./controller");
const router = express.Router();

// middleware
router.param("userId", getUserById);
// router.param("videoId");

// routes
router.get("/users", getAllUsers);
router.post("/signup", signUp);
router.post("/signIn", signIn);

router.route("/user/:userId").get(getUser).post(updateUser).delete(deleteUser);

// router.get("/user/:userId/likedvideos/",getAllLikedVideos);
router.post("/user/:userId/likedvideo/:videoId",updateUserLikedVideos);

module.exports = router;
