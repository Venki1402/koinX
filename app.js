const express = require("express");
const cron = require("node-cron");
const cryptoRoutes = require("./routes/cryptoRoutes");
const { fetchCryptoData } = require("./services/cryptoService");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

console.log("Connecting to MongoDB...");
connectDB();


console.log("Fetching initial crypto data...");
fetchCryptoData();

console.log("Setting up routes...");
app.use("/api", cryptoRoutes);

cron.schedule("0 */2 * * *", async () => {
  console.log("Fetching crypto data...");
  await fetchCryptoData();
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
