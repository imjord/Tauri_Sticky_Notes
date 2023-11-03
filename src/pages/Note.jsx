import React, {useState, useEffect} from 'react'
import Menu from '../components/Menu/Menu'
import "./Note.css";
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { useNoteContext } from '../NoteContext';
import NoteMenu from '../components/NoteMenu/NoteMenu';
import NoteFooterMenu from '../components/NoteFooterMenu/NoteFooterMenu';

const Note = (props) => {
  const {setNoteContent, noteContent, addNote} = props;
  const {noteId, setNoteId} = useNoteContext();
  
  console.log(noteContent);

  useEffect(() => {
    setNoteId(getCurrent().label);
    console.log(getCurrent().label);
  },[]);

  return (
    <div>
      <NoteMenu />
          <div className='note-div'>
      <div className='note-text-box'>
        <div className='note-input'>
        <textarea
          spellcheck='false'

         placeholder='Take a note...'
         onChange={(e) => setNoteContent(e.target.value)}
      /></div>
      </div>
    </div>
    <NoteFooterMenu addNote={addNote} />
    </div>

  )
}

export default Note