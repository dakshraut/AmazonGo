const router = require("express").Router();
const { getRecommendations } = require("../controllers/recommendationController");

router.post("/", getRecommendations);

module.exports = router;
