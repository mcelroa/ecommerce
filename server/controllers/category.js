const Category = require("../models/category");
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec()
    .then((category) => {
      req.category = category;
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        err: 'Category does not exist'
      })
    })
}

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save()
    .then((data) => {
      return res.json({ data });
    })
    .catch((err) => {
      return res.status(400).json({
        err: errorHandler(err)
      });
    })
}

exports.read = (req, res) => {
  res.json(req.category);
}

exports.readAll = (req, res) => {
  Category.find().exec()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      return res.status(400).json({
        msg: errorHandler(err)
      })
    })
}

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save()
    .then((category) => {
      res.json(category)
    })
    .catch((err) => {
      return res.status(400).json({
        err: errorHandler(err)
      })
    })
}

exports.remove = (req, res) => {
  const category = req.category;
  category.deleteOne().exec()
    .then(() => {
      res.json({
        msg: "Category delete"
      })
    })
    .catch((err) => {
      return res.status(400).json({
        err: errorHandler(err)
      })
    })
}
