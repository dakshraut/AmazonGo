const router = require("express").Router();
const { addToCart, getCart } = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/:userId", getCart);

module.exports = router;
