
// Import the Express module
const express = require('express');

// Create an instance of Express
const app = express();

// Define a port number
const PORT = 3000;

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to the Express server!');
});

// Define another route for demonstration
app.get('/about', (req, res) => {
  res.send('This is the About page.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
