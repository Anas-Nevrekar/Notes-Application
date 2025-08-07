const express = require ('express'); // Import the express module
const app = express(); // Create an instance of express
const port = process.env.PORT || 3000; // Use environment variable or default to 3000
const mongoose = require('./config/db.config');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
// Middlewares  
app.set('view engine', 'ejs'); // Set EJS as the templating engine. 
app.set('views', './views'); // Set the directory for views
app.use(express.json()); // Middleware to parse  JSON bodies.  
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Middleware for sessions
app.use(session({
    secret: 'your_secret_key', // Replace with a secure key
    resave: false, // Prevent resaving session if nothing changes
    saveUninitialized: true // Save uninitialized sessions
}));

// Middleware for flash messages
app.use(flash());
app.use(cookieParser());

//Routes
const homeRoutes = require('./routes/home.routes'); // Import home routes
const loginRoutes = require('./routes/loginPage.route'); // Import login routes
 app.use('/', homeRoutes); // Use home routes for the root path
app.use('/login', loginRoutes); // Use login routes for the /login path

// Start the server 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`); 
});