import Analytics from "../models/Analytics.js";

export const getAnalytics = async (req, res) => {
  const data = await Analytics.find();
  res.json(data);
};
