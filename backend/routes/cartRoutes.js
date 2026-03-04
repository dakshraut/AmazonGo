import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect); // All cart routes require authentication

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", removeFromCart);

export default router;
