import express from "express";
import { createProduct, getProducts, getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);

export default router;
