import express from "express";
import {
  createTransaction,
  getMyTransactions,
  getAllTransactions
} from "../controllers/transactionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/my", protect, getMyTransactions);
router.get("/", protect, getAllTransactions);

export default router;
