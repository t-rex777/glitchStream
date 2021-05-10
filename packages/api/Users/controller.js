const User = require("./model");
const Video = require("../Video/model");
const { extend, concat, union } = require("lodash");
const { Mongoose } = require("mongoose");

//fining user by Id
exports.getUserById = async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId)
      .populate("likedVideos")
      .populate("playlists.videos")
      .populate("history");
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
    const users = await User.find({})
      .populate("likedVideos")
      .populate("playlists.videos")
      .populate("history");
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
    await User.findOne({ email: userEmail })
      .populate("likedVideos")
      .populate("playlists.videos")
      .populate("history")
      .exec((err, user) => {
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

exports.updateUserPlaylist = async (req, res) => {
  try {
    const newPlaylist = req.body;
    let { user } = req;
    let isSameName = false;
    user.playlists.forEach((playlist) => {
      if (playlist.name === newPlaylist.name) {
        isSameName = true;
        if (playlist.videos.includes(newPlaylist.videos)) {
          console.log("same name same id");
          return user;
        } else {
          console.log("same name, different id");

          user.playlists.forEach((x) => {
            x.videos = [...x.videos, newPlaylist.videos];
          });
          return user.save((err, updatedUser) => {
            if (err) {
              return res.status(400).json({
                message: "playlist didn't updated",
              });
            }
            res.send(updatedUser);
          });
        }
      }
    });
    if (!isSameName) {
      console.log("different name");
      user = extend(user, {
        playlists: concat(newPlaylistuser.playlists),
      });
      user.save((err, updatedUser) => {
        if (err) {
          return res.status(400).json({
            message: "playlist didn't updated",
          });
        }
        res.send(updatedUser);
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateUserSuscription = async (req, res) => {
  try {
    const { suscriptions } = req.body;
    let { user } = req;
    console.log(suscriptions);
    user = extend(user, {
      suscriptions: concat(suscriptions, user.suscriptions),
    });
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          message: "suscription didn't updated",
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
    user = extend(user, {
      likedVideos: concat(videoId, user.likedVideos),
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

exports.updateUserHistory = async (req, res) => {
  try {
    const { videoId } = req.params;
    let { user } = req;
    let finalArray = [];

    // if (user.history.find((element) => element == videoId)) {
    user.history.forEach((vid) => {
      if (vid._id != videoId) {
        finalArray = [...finalArray, vid._id];
      }
    });
    // }
    finalArray = [videoId, ...finalArray];
    user.history = finalArray;

    // user = extend(user, {
    //   history: concat(videoId, user.history),
    // });
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          message: "history didn't updated",
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

exports.removeUserPlaylist = async (req, res) => {
  try {
    const { user } = req;
    const { playlistId } = req.params;
    const playlist = req.body;
    let newPlaylist = [];
    user.playlists.forEach((item) => {
      if (playlistId != item._id) {
        newPlaylist = [...newPlaylist, item];
      }
    });
    if (playlist.videos.length === 0) {
      newPlaylist = [...newPlaylist];
    } else {
      newPlaylist = [...newPlaylist, playlist];
    }

    user.playlists = newPlaylist;
    await user.save((err, updatedUser) => {
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
