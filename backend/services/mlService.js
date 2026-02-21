const axios = require("axios");

exports.getRecommendations = async (cartItems) => {
  try {
    const res = await axios.post(`${process.env.ML_API_URL}/recommend`, {
      cart: cartItems
    });
    return res.data;
  } catch (err) {
    console.error("ML API Error:", err.message);
    return [];
  }
};
