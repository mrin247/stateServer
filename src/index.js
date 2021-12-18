const env = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
connectDB();

const storeAuthRoutes = require("./routes/store/auth");

app.use(express.json());

app.use("/api", storeAuthRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
