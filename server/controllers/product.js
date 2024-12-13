const formidable = require('formidable');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const _ = require('lodash');
const fs = require('fs');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec()
    .then((product) => {
      req.product = product;
      next();

    })
    .catch((err) => {
      return res.status(400).json({
        err: 'Product not found'
      })
    })
};

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {

    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }

    // Ensure correct data type for fields
    const productData = {
      name: fields.name?.[0] || null, // Default value if name is missing
      description: fields.description?.[0] || null, // Default description
      price: fields.price?.[0] ? parseFloat(fields.price[0]) : null, // Default price if invalid or missing
      quantity: fields.quantity?.[0] ? parseInt(fields.quantity[0], 10) : null, // Default quantity
      category: fields.category?.[0] || null, // Default category
    };


    const { name, description, price, quantity, category } = productData;
    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let product = new Product(productData);

    if (files.photo[0]) {
      if (files.photo[0].size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo[0].filepath);
      product.photo.contentType = files.photo[0].mimetype;
    }

    product.save()
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        return res.status(400).json({
          error: errorHandler(err)
        });
      });
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.update = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {

    console.log(files)

    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }

    // Ensure correct data type for fields
    const productData = {
      name: fields.name?.[0] || null, // Default value if name is missing
      description: fields.description?.[0] || null, // Default description
      price: fields.price?.[0] ? parseFloat(fields.price[0]) : null, // Default price if invalid or missing
      quantity: fields.quantity?.[0] ? parseInt(fields.quantity[0], 10) : null, // Default quantity
      category: fields.category?.[0] || null, // Default category
    };

    console.log(productData);


    const { name, description, price, quantity, category } = productData;
    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let product = req.product;
    product = _.extend(product, productData);

    console.log(product);

    if (files.photo[0]) {
      if (files.photo[0].size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo[0].filepath);
      product.photo.contentType = files.photo[0].mimetype;
    }

    product.save()
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        return res.status(400).json({
          error: errorHandler(err)
        });
      });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.deleteOne().exec()
    .then(() => {
      res.json({
        msg: 'Product has been deleted'
      })
    })
    .catch((err) => {
      return res.status(400).json({
        err: errorHandler(err)
      })
    })
}
