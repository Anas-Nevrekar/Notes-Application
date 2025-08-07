const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({ // Define the schema for the note model
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true }); // Add timestamps to the schema. So that it will automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Note', noteSchema);

















