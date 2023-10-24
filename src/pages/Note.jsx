import React, {useState, useEffect} from 'react'
import Menu from '../components/Menu/Menu'
import "./Note.css";
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { useNoteContext } from '../NoteContext';
const Note = () => {

  const {noteId, setNoteId} = useNoteContext();
  

  useEffect(() => {
    setNoteId(getCurrent().label);
    console.log(getCurrent().label);
  },[]);

  return (
    <div className='note-div'>
      <div className='note-text-box'>
        <div className='note-input'>
        <input type='text' placeholder='Take a note...' onChange={(e) => setNoteValue(e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default Note