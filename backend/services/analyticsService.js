import Analytics from "../models/Analytics.js";

export const logEvent = async (event, userId) => {
  await Analytics.create({ event, userId, time: new Date() });
};
