import React from 'react'
import "./List.css";
import NoteCard from '../NoteCard/NoteCard';
import noteImage from "../../assets/notes_plac.png";
const List = () => {




  return (
    <div className='list'>
        {/* <NoteCard /> */}
        
        <div className='no-notes'>
        <div className='no-notes-image'>
        <img src={noteImage} alt='notes' />

          </div>  
          <div className='no-notes-p'>
          <p>Tap the new note button above to create a note</p>
          </div>
        </div>
       
    </div>
  )
}

export default List