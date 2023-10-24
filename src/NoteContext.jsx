import React, { createContext, useContext, useState } from 'react';

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [noteId, setNoteId] = useState(0);

  return (
    <NoteContext.Provider value={{ noteId, setNoteId }}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNoteContext() {
  return useContext(NoteContext);
}