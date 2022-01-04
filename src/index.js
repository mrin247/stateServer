// Import Packages
const env = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const bodyParser = require("body-parser");
const cors = require("cors");
// Import Error handlers
const errorhandler = require("./middlewares/errHandler");

// Setup App & DB
const app = express();
connectDB();

// Import Routes
const storeAuthRoutes = require("./routes/store/auth");
const storeProductRoutes = require("./routes/store/product");

// App middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", storeAuthRoutes);
app.use("/api", storeProductRoutes);

// Error Middlewares
app.use(errorhandler);

// Setup Connection
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});

// Unhandled Error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
