const axios = require("axios");
const Crypto = require("../models/Crypto");

const coins = ["bitcoin", "matic-network", "ethereum"];

const fetchCryptoData = async () => {
  try {
    for (const coin of coins) {
      const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
      const { data } = await axios.get(url);

      const cryptoData = {
        coin: coin,
        price: data.market_data.current_price.usd,
        marketCap: data.market_data.market_cap.usd,
        change24h: data.market_data.price_change_percentage_24h,
      };

      const newCrypto = new Crypto(cryptoData);
      await newCrypto.save();
    }
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
};

module.exports = { fetchCryptoData };
