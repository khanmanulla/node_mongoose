const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Database connection setup
const userRoutes = require('./routes/index'); // Import main routes module

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
