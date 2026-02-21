import Transaction from "../models/Transaction.js";
import Cart from "../models/Cart.js";


/**
 * @desc    Create transaction (checkout)
 * @route   POST /api/transactions
 */
export const createTransaction = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      items,
      totalAmount,
      paymentMethod,
      status: "SUCCESS"
    });

    // Clear user's cart after transaction
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Get user transactions
 * @route   GET /api/transactions/my
 */
export const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Get all transactions (admin analytics)
 * @route   GET /api/transactions
 */
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "name email")
      .populate("items.product");

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
