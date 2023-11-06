import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { emit, listen } from '@tauri-apps/api/event'


const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [note, setNote] = useState("");
  const [localNote, setLocalNote] = useState("");
  const [notes, setNotes] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [noNotes , setNoNotes] = useState(false);
  const [noteColor, setNoteColor] = useState("Yellow");

  const getNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/notes");
      setNotes(response.data);
      setLoading(false);
      console.log("GOT NOTES");
    } catch (err) {
      console.log(err);
      if(err.response.data === "no notes found"){
        setNoNotes(true);
        setLoading(false);
      }
    }
  }

  return (
    <NoteContext.Provider value={{ note, setNote, getNotes, notes, loading, noNotes, setLocalNote, localNote, setNoteColor, noteColor}}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNoteContext() {
  return useContext(NoteContext);
}