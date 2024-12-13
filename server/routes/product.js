const express = require("express");
const router = express.Router();

const { create, read, update, remove, productById } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/product/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/product/:productId", read);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
