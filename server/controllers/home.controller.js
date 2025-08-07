const mongoose = require('mongoose'); // Import mongoose for MongoDB connection
const Notes = require('../models/note.model'); // Import the Note model
const User = require('../models/user.model'); // Import the User model


// Define a route for the home page
exports.showHomePage = async (req, res) => {
    try {
        const email = req.user; // Retrieve email from cookies
        // if (!email) {
        //     return res.redirect('/login/home'); // Redirect to login if no email is found
        // }

        // Find the user by email
        const user = await User.findOne({ email });
        // if (!user) {
        //     return res.redirect('/login/home'); // Redirect to login if user is not found
        // }

        const username = user.username; // Get the username from the user object

        // Fetch notes for the user
        const notes = await Notes.find({ userId: user._id }).sort({ createdAt: -1 }); // Sort notes by creation date in descending order


        res.render('home', { notes, username }); // Pass notes and username to home.ejs
    } catch (error) {
        console.error('Error fetching home page:', error);
        res.status(500).send('Internal Server Error');
    }
}  

// ➕ Add a new note
exports.addNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        req.flash('error', 'Title and content are required'); // Flash an error message if title or content is missing
        return res.redirect('/'); // Redirect to home page  
    }

    const email = req.user;
    const user = await User.findOne({ email });
    const username = user.username; 
    const userId = user._id; // Get the user ID from the user object
  
    const note = new Notes({
        title,
        content,
        userId: userId // Use the user ID from the request object
    });

    note.save() // Save the note to the database
        .then(() => {
            req.flash('success', 'Note added successfully'); // Flash a success message
            res.redirect('/'); // Redirect to home page
        })
        .catch(err => {
            console.error('Error adding note:', err);
            req.flash('error', 'Failed to add note'); // Flash an error message if saving fails
            res.redirect('/'); // Redirect to home page
        });
}

exports.updatePage = async (req, res) => {
    const noteId = req.params.id;

    try {
        // Find the note by ID in the database
        const note = await Notes.findById(noteId);

        if (note) {
            res.render('update', { note }); // Render the update page with the note to be updated
        } else {
            res.status(404).send('Note not found'); // Return 404 if note is not found
        }
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).send('Internal Server Error');
    }
};

// ✏️ Update a note
exports.updateNote = async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;

    if (!title || !content) {
        req.flash('error', 'Title and content are required'); // Flash an error message if title or content is missing
        return res.redirect(`/update/${noteId}`); // Redirect to the update page
    }

    try {
        // Find the note by ID and update its title and content
        const note = await Notes.findByIdAndUpdate(noteId, { title, content }, { new: true });

        if (!note) {
            return res.status(404).send('Note not found'); // Return 404 if note is not found
        }

        req.flash('success', 'Note updated successfully'); // Flash a success message
        res.redirect('/'); // Redirect to the home page after updating
    } catch (error) {
        console.error('Error updating note:', error);
        req.flash('error', 'Failed to update note'); // Flash an error message if updating fails
        res.redirect(`/update/${noteId}`); // Redirect to the update page
    }
};

// ❌ Delete a note
exports.deleteNote = (req, res) => {
    const noteId = req.params.id;
    
    Notes.findByIdAndDelete(noteId) // Find the note by ID and delete it
        .then(() => {
            req.flash('success', 'Note deleted successfully'); // Flash a success message
        })
        .catch(err => {
            console.error('Error deleting note:', err);
            req.flash('error', 'Failed to delete note'); // Flash an error message if deletion fails
        } );
    // Redirect to the home page after deletion 
    
    res.redirect("/");
}