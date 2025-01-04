const express = require("express");
const router = express.Router();

const { create, read, listAll, listSearch, update, remove, listRelated, listCategories, listBySearch, photo, productById } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// POST Requests
router.post("/product/:userId", requireSignin, isAuth, isAdmin, create);
router.post("/products/by/search", listBySearch);
router.post("/products/search", listSearch);

// GET Requests
router.get("/product/:productId", read);
router.get("/products", listAll);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.get('/product/photo/:productId', photo);

// PUT Requests
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);

// DELETE Requests
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);

// Params
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
