import React, {useState, useEffect} from 'react'
import Menu from '../components/Menu/Menu'
import "./Note.css";
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { useNoteContext } from '../NoteContext';
import NoteMenu from '../components/NoteMenu/NoteMenu';
import NoteFooterMenu from '../components/NoteFooterMenu/NoteFooterMenu';
import qs from 'qs';
import axios from "axios";

const Note = (props) => {
  const {note, setNote, setNoteId, getNotes, setLocalNote, localNote} = useNoteContext();
  const {newNote} = props;

  localStorage.setItem(getCurrent().label, note);
  

  // const addNote = async () => {
  //   try {
  //     const data = qs.stringify({
  //       content: note,
  //     });
  //     const response = await axios.post("http://localhost:8080/notes", data, {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     });

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }



  useEffect(() => {
   
  }, []);

  return (
    <div>
      <NoteMenu  newNote={newNote}/>
          <div className='note-div'>
      <div className='note-text-box'>
        <div className='note-input'>
        <textarea
          spellCheck='false'

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