import React, {useState, useEffect} from 'react'
import "./Note.css";
import { useNoteContext } from '../NoteContext';
import NoteMenu from '../components/NoteMenu/NoteMenu';
import NoteFooterMenu from '../components/NoteFooterMenu/NoteFooterMenu';
import { useLocation } from 'react-router-dom'
import axios from "axios";

const Note = (props) => {
  const {setNote} = useNoteContext();
  const {newNote} = props;
  const [currentNote, setCurrentNote] = useState("");
  let location = useLocation();


// note window thats created

  const getNoteContent = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/notes/${id}`);
      console.log(response.data.content);
      setCurrentNote(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };

// get the url from the window /note/:id
const getPath = () => {
  const pathname = location.pathname;
  const match = pathname.match(/\/note\/(\w+)/);
  getNoteContent(match[1])
}

// get the path on note created so add to id state
useEffect(() => {
  getPath();
}, [])

  return (
    <div>
      <NoteMenu  newNote={newNote}/>
          <div className='note-div'>
      <div className='note-text-box'>
        <div className='note-input'>
        <textarea
          spellCheck='false'
          placeholder={currentNote.length === 0 ? 'Take a note...' : ''}
          defaultValue={currentNote}
         onChange={(e) => setNote(e.target.value)}
      /></div>
      </div>
    </div>
    <NoteFooterMenu  />
    </div>

  )
}

export default Note