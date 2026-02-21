const router = require("express").Router();
const { createProduct, getProducts } = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);

module.exports = router;
