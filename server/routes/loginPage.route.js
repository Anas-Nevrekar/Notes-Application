const express = require('express'); // Importing express to create a router
const router = express.Router(); // Creating a new router instance
const loginController = require('../controllers/login.controller'); // Importing the login controller
const  {authMiddleware, generateToken} = require ("../middlewares/jwt.middleware");

router.get('/home', loginController.showLoginPage); // Define a route for the login   page

router.post('/handleLogin', loginController.handleLogin); // Route to handle login form

router.post('/register', loginController.handleRegister); // Route to handle registration form

router.get('/logout', authMiddleware, loginController.handleLogout); // Route to handle logout

module.exports = router;