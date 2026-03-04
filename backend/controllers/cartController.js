import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { _id, name, price } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
        total: 0
      });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(item => item.productId === _id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: _id,
        name,
        price,
        quantity: 1
      });
    }

    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();
    res.json({ success: true, data: cart.items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('user', 'name email');

    if (!cart) {
      return res.json({ success: true, data: [] });
    }

    res.json({ success: true, data: cart.items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId !== itemId);

    // Recalculate total
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();
    res.json({ success: true, data: cart.items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
