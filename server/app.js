const express = require ('express'); // Import the express module
const app = express(); // Create an instance of express
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middlewares  
app.set('view engine', 'ejs'); // Set EJS as the templating engine. 
app.set('views', './views'); // Set the directory for views
app.use(express.json()); // Middleware to parse  JSON bodies.  
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

//Routes
const homeRoutes = require('./routes/home.routes'); // Import home routes
app.use('/', homeRoutes); // Use home routes for the root path


// Start the server 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`); 
});