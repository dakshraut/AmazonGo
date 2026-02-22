import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    cart.items.push({ productId, qty: 1 });
    await cart.save();

    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
