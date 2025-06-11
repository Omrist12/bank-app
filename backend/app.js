const express = require('express');
const cors = require('cors');

const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const signupRoute = require('./routes/signup');
app.use('/signup', signupRoute);

// Test route
app.get('/', (req, res) => {
  res.send('Bank API is running...');
});

module.exports = app;
