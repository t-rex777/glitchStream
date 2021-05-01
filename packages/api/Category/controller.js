const Category = require("./model");

// middleware
exports.getCategoryById = async (req, res, next, categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    req.category = category;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// READ
exports.getOneCategory = async (req, res) => {
  try {
    const { category } = await req;
    res.send(category);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const category = await Category.find({});
    return res.json(category);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// CREATE
exports.createCategory = async (req, res) => {
  try {
    const category = await new Category(req.body);
    category.save((err, category) => {
      if (err) {
        return res.status(400).json({
          message: "Failed in creating category!",
        });
        res.json(category);
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
