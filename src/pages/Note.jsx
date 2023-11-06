import React, {useState, useEffect, useRef } from 'react'
import "./Note.css";
import { useNoteContext } from '../NoteContext';
import NoteMenu from '../components/NoteMenu/NoteMenu';
import NoteFooterMenu from '../components/NoteFooterMenu/NoteFooterMenu';
import { useLocation } from 'react-router-dom'
import axios from "axios";
import qs from 'qs';
import { emit } from '@tauri-apps/api/event';

const Note = (props) => {
  const {setNote, note, noteColor, setNoteColor, setNoNotes, noNotes} = useNoteContext();
  
  const {newNote} = props;
  const [currentNote, setCurrentNote] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [id, setId] = useState("");
  const typingTimeout = useRef(null); 
  let location = useLocation();





  

const getColor = (color) => {
  switch (color) {
    case "Blue":
      setNoteColor("Blue");
      break;
    case "Yellow":
      setNoteColor("Yellow");
      break;
    case "Green":
      setNoteColor("Green");
    break;
    case "Pink":
      setNoteColor("Pink");
    break;
    case "Purple":
      setNoteColor("Purple");
    break;
    case "Gray":
      setNoteColor("Gray");
    break;
    case "Black":
      setNoteColor("Black");
    break;
    default:
      setNoteColor("Yellow");
      break;
  } 
}


const getNoteContent = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/notes/${id}`);
      console.log(response.data);
      setCurrentNote(response.data.content);
      getColor(response.data.color);
    } catch (err) {
      console.log(err);
    }
  };
// get the url from the window /note/:id
const getPath = () => {
  const pathname = location.pathname;
  const match = pathname.match(/\/note\/(\w+)/);
  getNoteContent(match[1])
  setId(match[1])
}





const addNote = async (id) => {
  try {
    const data = qs.stringify({
      content: note,
    });
    const response = await axios.put(`http://localhost:8080/notes/${id}`, 
    {
      content: note
    }
      
    );
    emit('update_notes');

  } catch (err) {
    console.log(err);
  }
}





  // Handle text area changes and typing detection 
   const handleTextareaChange = (e) => {
          setNote(e.target.value);
        // Clear the previous timeout
        clearTimeout(typingTimeout.current);
      // Set a new timeout to determine if typing has stopped
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);

      addNote(id)
    }, 2500); // Adjust the delay as needed
    // Indicate that the user is typing
    setIsTyping(true);
  };




  // useEffect(() => {
  //   // This effect will run whenever noteColor changes
  //   console.log(noteColor);
  // }, [noteColor]);



// get the path on note created so add to id state
useEffect(() => {
  getPath();
  setNoNotes(false);
  console.log(noNotes)
  emit('update_notes');

}, [noteColor])

  return (
    <div className='note-page'>
      <NoteMenu  id={id} noteColor={noteColor}  newNote={newNote}/>
          <div className='note-div'>
      <div className='note-text-box'>
        <div className='note-input'>
        <textarea
          spellCheck='false'
          placeholder={currentNote.length === 0 ? 'Take a note...' : ''}
          defaultValue={currentNote}
         onChange={handleTextareaChange}
      /></div>
      </div>
    </div>
    <NoteFooterMenu  />
    </div>
  )
};

export default Note