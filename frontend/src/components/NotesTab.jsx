import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import NoteModal from "./NoteModal";
import NoteCard from "./NoteCard";

const NotesTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const {
    notes,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    isLoading,
    error,
  } = useAuthStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleOpenModal = (note = null) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingNote(null);
    setIsModalOpen(false);
  };

  const handleSaveNote = async (noteData) => {
    if (editingNote) {
      await updateNote(editingNote._id, noteData);
    } else {
      await createNote(noteData);
    }
    handleCloseModal();
  };

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-green-400 mb-6">Notes</h3>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleOpenModal()}
        className="mb-6 py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
      >
        Add New Note
      </motion.button>
      <AnimatePresence>
        {isModalOpen && (
          <NoteModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveNote}
            note={editingNote}
          />
        )}
      </AnimatePresence>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        <AnimatePresence>
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => handleOpenModal(note)}
              onDelete={() => handleDeleteNote(note._id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NotesTab;
