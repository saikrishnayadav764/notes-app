const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const authController = require("../controllers/authController");

// Authenticate user to protect routes
router.use(authController.authenticateUser);

// TO GET all notes
router.get("/notes", notesController.getAllNotes);

// TO GET a note by ID
router.get("/notes/:id", notesController.getNoteById);

// TO POST a new note
router.post("/notes", notesController.createNote);

// TO PUT/update a note by ID
router.put("/notes/:id", notesController.updateNoteById);

// TO DELETE a note by ID
router.delete("/notes/:id", notesController.deleteNoteById);

module.exports = router;
