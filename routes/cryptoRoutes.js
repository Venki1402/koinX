const express = require("express");
const { getLatestCryptoStats } = require("../controllers/cryptoController");
const { getStandardDeviation } = require("../controllers/cryptoController");

const router = express.Router();

router.get("/stats", getLatestCryptoStats);
router.get("/deviation", getStandardDeviation);

module.exports = router;
