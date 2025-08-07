const express = require('express'); // Importing express to create a router
const router = express.Router(); // Creating a new router instance
const homeController = require('../controllers/home.controller'); // Importing the home controller
const  {authMiddleware, generateToken} = require ("../middlewares/jwt.middleware");


router.get('/',authMiddleware, homeController.showHomePage); // Define a route for the home page

router.post('/add',authMiddleware, homeController.addNote); // Route to add a new note

router.get('/update/:id',authMiddleware,  homeController.updatePage); 

router.post('/update/:id',authMiddleware, homeController.updateNote); // Route to update a note by ID

router.post('/delete/:id',authMiddleware, homeController.deleteNote); // Route to delete a note by ID

module.exports = router; // Exporting the router to be used in the main app
