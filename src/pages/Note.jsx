import React, {useState, useEffect} from 'react'
import Menu from '../components/Menu/Menu'
import "./Note.css";
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { useNoteContext } from '../NoteContext';
import NoteMenu from '../components/NoteMenu/NoteMenu';
import NoteFooterMenu from '../components/NoteFooterMenu/NoteFooterMenu';

const Note = (props) => {
  const {noteId, note, setNote, setNoteId} = useNoteContext();
  const {myId, newNote} = props;

  localStorage.setItem("note", note);
  

  useEffect(() => {
 
    console.log(getCurrent().label);
  },[]);

  return (
    <div>
      <NoteMenu myId={myId} newNote={newNote}/>
          <div className='note-div'>
      <div className='note-text-box'>
        <div className='note-input'>
        <textarea
          spellcheck='false'

         placeholder='Take a note...'
         onChange={(e) => setNote(e.target.value)}
      /></div>
      </div>
    </div>
    <NoteFooterMenu  />
    </div>

  )
}

export default Note