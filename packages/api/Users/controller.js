const User = require("./model");
const { extend, concat, union } = require("lodash");
const jwt = require("jsonwebtoken");

// authorization
exports.authorizeToken = async (req, res, next) => {
  if (
    !req.headers["authorization"] &&
    typeof req.headers["authorization"] !== "string"
  ) {
    return res.status(401).json({
      message: "No tokens found",
    });
  }

  try {
    const accessToken = req.headers["authorization"].split(" ")[1];
    const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = userId;
    return next();
  } catch (error) {
    res.status(401).json({
      message: "token cannot be verified! please check it again.",
    });
  }
};

//Read

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("history")
      .populate("playlists.videos")
      .populate("likedVideos");
    return res.send(user);
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
          error: err.message,
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
        if (err || user === null) {
          return res.status(400).json({
            message: "user does not exists!",
          });
        } else if (!user.authenticate(password)) {
          return res.status(401).json({
            message: "please enter the correct password!",
          });
        }
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );
        const refreshToken = jwt.sign(
          { userId: user._id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        res.json({ user, accessToken, refreshToken });
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.createAccessToken = (req, res) => {
  if (
    !req.headers["refresh-token"] &&
    typeof req.headers["refresh-token"] !== "string"
  ) {
    return res.status(401).json({
      message: "No refresh tokens found",
    });
  }

  try {
    const oldRefreshToken = req.headers["refresh-token"].split(" ")[1];
    const { userId } = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const refreshToken = jwt.sign(
      { userId: userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const accessToken = jwt.sign(
      { userId: userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({
      message: "refresh token cannot be verified! please check it again.",
    });
  }
};

//Update
exports.updateUser = async (req, res) => {
  try {
    let updatedUser = req.body;
    let user = await User.findById(req.userId);
    updatedUser = await extend(user, updatedUser);
    updatedUser.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          message: "User didn't update",
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
    let user = await User.findById(req.userId);
    let isSameName = false;
    user.playlists.forEach(async (playlist) => {
      if (playlist.name === newPlaylist.name) {
        isSameName = true;
        if (playlist.videos.includes(newPlaylist.videos)) {
          console.log("same name same id");
          return user;
        } else {
          console.log("same name, different id");
          user.playlists
            .find((playlist) => playlist.name === newPlaylist.name)
            .videos.push(newPlaylist.videos);
          user.save((err, updatedUser) => {
            if (err) {
              return res.status(400).json({
                message: "playlist didn't update",
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
        playlists: concat(newPlaylist, user.playlists),
      });
      user.save((err, updatedUser) => {
        if (err) {
          return res.status(400).json({
            message: "playlist didn't update",
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
    let user = await User.findById(req.userId);
    user = extend(user, {
      suscriptions: concat(suscriptions, user.suscriptions),
    });
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          message: "suscription didn't update",
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
    let user = await User.findById(req.userId);
    user = extend(user, {
      likedVideos: concat(videoId, user.likedVideos),
    });
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          message: "likedVideos didn't update",
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
    let user = await User.findById(req.userId);
    let finalArray = [];

    // if (user.history.find((element) => element == videoId)) {
    user.history.forEach((vid) => {
      if (vid._id != videoId) {
        finalArray = [...finalArray, vid._id];
      }
    });
    // }
    // console.log(finalArray, "before");
    finalArray = union([videoId], finalArray);
    // console.log(finalArray, "after");
    user.history = finalArray;

    await user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          message: "history didn't update",
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
exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId);
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
    let user = await User.findById(req.userId);
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
          message: "likedVideos didn't update",
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

exports.removeSuscription = async (req, res) => {
  try {
    let user = await User.findById(req.userId);
    let finalSuscriptions = req.body;

    user.suscriptions = Object.values(finalSuscriptions);
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          message: "suscriptions didn't update",
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
