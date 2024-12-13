const express = require("express");
const router = express.Router();

const { create, read, readAll, update, remove, categoryById } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/category/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/category/:categoryId", read);
router.get('/categories', readAll);
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);


router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
