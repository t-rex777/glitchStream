const User = require("./model");
const Video = require("../Video/model");
const { extend, concat, union } = require("lodash");
const { Mongoose } = require("mongoose");

//fining user by Id
exports.getUserById = async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//Read
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    await res.send(req.user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// exports.getAllLikedVideos = async (req, res) => {
//   try {
//     const { user } = req;
//     console.log(user);
//     let finalVideos = [];
//     // NOTE: send likedvideos to client
//     await user.likedVideos.forEach(async(videoId) => {
//      const vid = await Video.findById(videoId)
//      finalVideos.unshift(vid)
//     });
//     console.log(finalVideos)
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };

exports.showAllLikedVideos = async (req, res) => {
  try {
    res.send(req.user.likedVideos);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Create
exports.signUp = async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          message: "User didn't save",
        });
      }
      res.send(user);
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await req.body;
    const { email, password } = user;
    const userEmail = email;
    await User.findOne({ email: userEmail }).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          // NOTE: check for error
          message: "user does not exists!",
        });
      }
      res.json(user);
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//Update
exports.updateUser = async (req, res) => {
  try {
    let updatedUser = req.body;
    const { user } = req;
    console.log(updatedUser);
    updatedUser = await extend(user, updatedUser);
    updatedUser.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          message: "User didn't updated",
        });
      }
      res.send(updatedUser);
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateUserLikedVideos = async (req, res) => {
  try {
    const { videoId } = req.params;
    let { user } = req;
    // const addLikeVideos = union(videoId.split(" "),user.likedVideos);
    // console.log(videoId.split(' '))
    // console.log(user.likedVideos)
    // console.log(addLikeVideos)

    user = extend(user, {
      likedVideos: union(concat(user.likedVideos, videoId)),
    });
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          message: "likedVideos didn't updated",
        });
      }
      res.send(updatedUser);
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


// Delete
exports.deleteUser = (req, res) => {
  try {
    const { user } = req;
    user.deleteOne((err, user) => {
      if (err) {
        return res.status(400).json({
          message: "user didn't delete!",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
