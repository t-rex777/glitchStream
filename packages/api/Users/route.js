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
  updateUserHistory,
  updateUserSuscription,
  updateUserPlaylist,
  removeUserPlaylist,
  authorizeToken,
  createAccessToken,
} = require("./controller");
const router = express.Router();

// middleware
// router.param("userId", getUserById);
// router.param("videoId");

// routes
router
  .get("/token/access", createAccessToken)
  .post("/signup", signUp)
  .post("/signIn", signIn);
router
  .use(authorizeToken)
  .route("/user")
  .get(getUser)
  .post(updateUser)
  .delete(deleteUser);

// router.get("/user/likedvideos/",getAllLikedVideos);
router
  .use(authorizeToken)
  .post("/user/likedvideo/:videoId", updateUserLikedVideos)
  .post("/user/suscription", updateUserSuscription)
  .post("/user/history/:videoId", updateUserHistory)
  .post("/user/playlist", updateUserPlaylist)
  .post("/user/removeplaylist/:playlistId", removeUserPlaylist);

module.exports = router;
