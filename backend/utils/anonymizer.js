export const anonymizeUser = (user) => ({
  id: user._id,
  activity: user.activity,
  time: user.createdAt
});
