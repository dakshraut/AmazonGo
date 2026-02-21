const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) cart = await Cart.create({ userId, items: [] });

  cart.items.push({ productId, qty: 1 });
  await cart.save();

  res.json(cart);
};

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart);
};
