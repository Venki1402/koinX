const Crypto = require("../models/Crypto");

const getLatestCryptoStats = async (req, res) => {
  try {
    const { coin } = req.query;

    const latestCrypto = await Crypto.findOne({ coin })
      .sort({ timestamp: -1 })
      .exec();

    if (!latestCrypto) {
      return res
        .status(404)
        .json({ message: "No data found for the requested coin" });
    }

    res.json({
      price: latestCrypto.price,
      marketCap: latestCrypto.marketCap,
      change24h: latestCrypto.change24h,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getStandardDeviation = async (req, res) => {
  try {
    const { coin } = req.query;

    const cryptoRecords = await Crypto.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .exec();

    if (cryptoRecords.length === 0) {
      return res.status(404).json({ message: "Not enough data available" });
    }

    const prices = cryptoRecords.map((record) => record.price);
    // console.log("Prices for", coin, ":", prices);

    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;
    const stdDeviation = Math.sqrt(variance);

    res.json({ deviation: stdDeviation.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getLatestCryptoStats, getStandardDeviation };
