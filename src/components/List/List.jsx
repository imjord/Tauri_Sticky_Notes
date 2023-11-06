import React, { useEffect } from 'react'
import "./List.css";
import NoteCard from '../NoteCard/NoteCard';
import noteImage from "../../assets/notes_plac.png";

import { useNoteContext } from '../../NoteContext';
import { listen } from '@tauri-apps/api/event';

const List = (props) => {


const {noNotes, gotSearch, searchError, isSearching, getNotes, setNoNotes} = useNoteContext()
const { deleteNote} = props;


useEffect(() => {
  const unlisten = listen('update_notes', () => {
    setNoNotes(false);
  });


}, []);

return (
<div className='list'>
      {isSearching ? (
        <h1>Searching...</h1>
      ) : searchError ? (
        <h1>No notes found</h1>
      ) : noNotes ? (
        <div className='no-notes'>
          <div className='no-notes-image'>
            <img src={noteImage} alt='notes' />
          </div>
          <div className='no-notes-p'>
            <p>Tap the new note button above to create a note</p>
          </div>
        </div>
      ) : (
        <NoteCard deleteNote={deleteNote} />
      )}
    </div>
  )
}

export default List