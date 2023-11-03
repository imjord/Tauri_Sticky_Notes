import React, { createContext, useContext, useState } from 'react';

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [note, setNote] = useState("");

  return (
    <NoteContext.Provider value={{ note, setNote}}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNoteContext() {
  return useContext(NoteContext);
}