const User = require('../models/user.model'); // Import the User model
const  {authMiddleware, generateToken} = require ("../middlewares/jwt.middleware");
const bcrypt = require ('bcrypt')

exports.showLoginPage = (req, res) => {
    const message = req.flash('error'); // Retrieve flash message
    res.render('loginPage', { message }); // Render login page with message
};

exports.handleLogin = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body
    try {
        // Find user by email 
        const user = await User.findOne({ email }); // Search for user by email
         const match = await bcrypt.compare(password, user.hash_password); // Compare provided password with stored hash_password
        // If user is not found or password does not match, return an error
        if (!user || !match) { // Check if user exists and password matches
            req.flash('error', 'Invalid email or password'); // Set flash message for error
            return res.redirect('/login/home'); // Redirect to login page
        }
        // If login is successful, set session data
        const token = generateToken(user.email) // Generate JWT token using email
        res.cookie('token', token, { httpOnly: true });   // Set token in cookies for client-side access
        res.redirect('/'); // Redirect to home page after successful login
    }
    catch (error) { 
        console.error('Error during login:', error); // Log any errors that occur during login
        res.status(500).send('Internal Server Error'); // Send a 500 error response if an error occurs
    }
};


exports.handleRegister = async (req, res) => {
    const username = req.body.username; // Extract username from request body   
    const email = req.body.email; // Extract email from request body
    const password = req.body.password.trim(); // Extract password from request body
     // Extract data from the registration form

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] }); // Search for existing user by username or email. $or operator allows searching by multiple fields
        // If user exists, send an error message
        if (existingUser) {
            req.flash('error', 'Username or email already exists'); // Set flash message
            return res.redirect('/login/home'); // Redirect to login page
        }

        // Create and save new user
        const hash_password = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, hash_password }); // Create a new user instance
        await newUser.save(); // Save the new user to the database
        const token = generateToken(newUser.email) // Generate JWT token using email
        res.cookie('token', token, { httpOnly: true });   // Set token in cookies for client-side access
        res.redirect('/'); // Redirect to login page after successful registration
    } catch (error) {
        console.error('Error registering user:', error); // Log any errors that occur during registration
        res.status(500).send('Internal Server Error'); // Send a 500 error response if an error occurs
    }
};


exports.handleLogout = (req, res) => {
    res.clearCookie('token'); // Clear the token cookie to log out the user
    req.flash('success', 'Logged out successfully'); // Set flash message for successful logout
    res.redirect('/login/home'); // Redirect to login page after logout
};

