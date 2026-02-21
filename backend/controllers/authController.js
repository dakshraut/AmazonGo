const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    anonymizedId: "anon_" + Date.now()
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ msg: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
};
