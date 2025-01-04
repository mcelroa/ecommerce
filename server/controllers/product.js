const formidable = require('formidable');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const _ = require('lodash');
const fs = require('fs');
const product = require('../models/product');

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

    if (files && files.photo && files.photo[0]) {
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

exports.listAll = (req, res) => {
  const order = req.query.order === 'desc' ? -1 : 1; // Ensure order is either 1 (asc) or -1 (desc)
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id'; // Field to sort by
  const limit = parseInt(req.query.limit) || 6; // Ensure limit is a number

  Product.find()
    .select('-photo')
    .populate('category')
    .sort({ [sortBy]: order })
    .limit(limit)
    .exec()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      return res.status(400).json({
        error: 'Products not found',
      });
    });
};

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 6;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec()
    .then((products) => {
      res.json(products)
    })
    .catch((err) => {
      return res.json({
        error: 'Products not found'
      })
    })
}

exports.listCategories = (req, res) => {
  Product.distinct('category', {})
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      return res.status(400).json({
        error: 'No products found'
      })
    })
}

exports.update = (req, res) => {
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

    let product = req.product;
    product = _.extend(product, productData);

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
        error: errorHandler(err)
      })
    })
}

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit)
    .exec()
    .then((data) => {
      res.json({
        size: data.length,
        data
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Products not found"
      });
    })
};

exports.photo = (req, res) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
}

exports.listSearch = (req, res) => {
  // create a query object to hold search value and category value coming from client
  const query = {}
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' }

    if (req.query.category && req.query.category != 'All') {
      query.category = req.query.category
    }
  }

  product.find(query)
    .select('-photo')
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      return res.status(400).json({
        error: errorHandler(err)
      })
    })

}