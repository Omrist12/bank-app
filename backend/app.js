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
const { router: signupRoute } = require("./routes/signup");
const verifyRoute = require("./routes/verify");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/signup", signupRoute);
app.use("/verify", verifyRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Bank API is running...");
});

module.exports = app;
