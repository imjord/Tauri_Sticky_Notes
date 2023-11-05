import React, {useState, useEffect} from 'react'
import "./Note.css";
import { useNoteContext } from '../NoteContext';
import NoteMenu from '../components/NoteMenu/NoteMenu';
import NoteFooterMenu from '../components/NoteFooterMenu/NoteFooterMenu';

const Note = (props) => {
  const {setNote} = useNoteContext();
  const {newNote} = props;


// note window thats created

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