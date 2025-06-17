require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const signupRoute = require("./routes/signup");
const verifyRoute = require("./routes/verify");
const loginRoute = require("./routes/login");
const dashboardRoute = require("./routes/dashboard");
const authenticateToken = require("./middleware/authMiddleware");
const transactionRoutes = require("./routes/transactions");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/signup", signupRoute);
app.use("/verify", verifyRoute);
app.use("/login", loginRoute);
app.use("/dashboard", dashboardRoute);
app.use("/transactions", transactionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Bank API is running...");
});

module.exports = app;
