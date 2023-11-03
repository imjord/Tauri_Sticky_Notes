import React, { useState } from 'react'
import "./List.css";
import NoteCard from '../NoteCard/NoteCard';
import noteImage from "../../assets/notes_plac.png";
import { useNoteContext } from '../../NoteContext';
const List = (props) => {

  const {noteId, note, setNote, setNoteId} = useNoteContext();

  const {notes, noNotes, loading} = props;



  return (
    <div className='list'>
      {noNotes ? 
          <div className='no-notes'>
          <div className='no-notes-image'>
          <img src={noteImage} alt='notes' />
            </div>  
            <div className='no-notes-p'>
            <p>Tap the new note button above to create a note</p>
            </div>
          </div> 
        :   <NoteCard notes={notes} loading={loading} />
  }
    </div>
  )
}

export default List