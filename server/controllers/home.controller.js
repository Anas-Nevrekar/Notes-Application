

let notes = [];

// Define a route for the home page
exports.showHomePage = (req, res) => {
    res.json({ message: "Welcome to Notes API" });
}  

// ➕ Add a new note
exports.addNote = (req, res) => {
const { title, content } = req.body;

  const newNote = {
    id: Date.now().toString(),
    title,
    content
  };

  notes.push(newNote);
  res.json({ message: "Note added", note: newNote});
}

// 📄 Get all notes
exports.getAllNotes = (req, res) => {
   res.json({ notes });
} 

// ✏️ Update a note
exports.updateNote = (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  notes.forEach(note => {
    if (note.id === noteId) {
      if (title) note.title = title;
      if (content) note.content = content;
    }
  });

  res.json({ message: `Note ${noteId} updated`, updatedNote: { title, content } });
}

// ❌ Delete a note
exports.deleteNote = (req, res) => {
    const noteId = req.params.id;
    
    notes = notes.filter(note => note.id !== noteId);
    
    res.json({ message: `Note ${noteId} deleted` });
}