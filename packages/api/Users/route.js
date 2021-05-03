const express = require("express");
const {
  getUserById,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./controller");
const router = express.Router();

// middleware
router.param("userId", getUserById);

// routes
router.route("/user")
.post(createUser);
router.route("/user/:userId")
.get(getUser)
.post(updateUser)
.delete(deleteUser);

module.exports = router;