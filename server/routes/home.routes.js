const express = require('express'); // Importing express to create a router
const router = express.Router(); // Creating a new router instance
const homeController = require('../controllers/home.controller'); // Importing the home controller


router.get('/', homeController.showHomePage); // Define a route for the home page

router.post('/add', homeController.addNote); // Route to add a new note

router.get('/get', homeController.getAllNotes); // Route to get all notes

router.put('/update/:id', homeController.updateNote); // Route to update a note by ID

router.delete('/delete/:id', homeController.deleteNote); // Route to delete a note by ID

module.exports = router;
