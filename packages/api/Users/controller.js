const User = require("./model");
const { extend } = require("lodash");

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
exports.getUser = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Create
exports.createUser = async (req, res) => {
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
