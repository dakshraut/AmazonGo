const Recommendation = require("../models/Recommendation");
const mlService = require("../services/mlService");

exports.getRecommendations = async (req, res) => {
  const { cartItems, userId } = req.body;

  const mlResponse = await mlService.getRecommendations(cartItems);

  const rec = await Recommendation.create({
    userId,
    items: mlResponse,
    source: "hybrid-ml"
  });

  res.json(rec);
};
