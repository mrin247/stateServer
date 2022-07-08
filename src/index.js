// Import Packages
const env = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
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
const storeOrderRoutes = require("./routes/store/order");

const clientAuthRoutes = require("./routes/client/auth");
const clientcartRoutes = require("./routes/client/cart");
const clientProductRoutes = require("./routes/client/product");
const clientAddressRoutes = require("./routes/client/address");
const clientOrderRoutes = require("./routes/client/order");

// App middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", storeAuthRoutes);
app.use("/api", storeProductRoutes);
app.use("/api", storeOrderRoutes);

app.use("/api", clientAuthRoutes);
app.use("/api", clientcartRoutes);
app.use("/api", clientProductRoutes);
app.use("/api", clientAddressRoutes);
app.use("/api", clientOrderRoutes);

app.get("/", (req, res) => {
  res.send("Server Deployed");
});

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
