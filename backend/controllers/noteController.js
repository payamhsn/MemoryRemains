import Note from "../models/noteModel.js";

export const getNotes = async (req, res) => {
  try {
    // console.log("User ID:", req.userId); // Log the user ID for debugging
    const notes = await Note.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { subject, content } = req.body;
    console.log("Creating note:", { subject, content }); // Log the note data for debugging
    const newNote = new Note({
      user: req.userId,
      subject,
      content,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating note", error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { subject, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { subject, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(updatedNote);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating note", error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting note", error: error.message });
  }
};
