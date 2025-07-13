const express = require ('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middleware for parsing JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('<h1>Hello, Anas!</h1>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});