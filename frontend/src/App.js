import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API = "http://localhost:5000/notes";

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API);
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Fill title and content");
      return;
    }

    try {
      if (selectedId) {
        await axios.put(`${API}/${selectedId}`, { title, content });
      } else {
        await axios.post(API, { title, content });
      }

      setTitle("");
      setContent("");
      setSelectedId(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const editNote = (note) => {
    setSelectedId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      if (selectedId === id) {
        setSelectedId(null);
        setTitle("");
        setContent("");
      }

      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const createNewNote = () => {
    setSelectedId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Notes</h2>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        <button onClick={createNewNote}>+ New Note</button>

        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <h4 onClick={() => editNote(note)}>{note.title}</h4>

            <div className="note-actions">
              <button onClick={() => editNote(note)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="editor">
        <h2>{selectedId ? "Edit Note" : "Create Note"}</h2>

        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write markdown here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={saveNote}>
          {selectedId ? "Update Note" : "Save Note"}
        </button>
      </div>

      <div className="preview">
        <h2>Preview</h2>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;