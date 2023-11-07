import { useEffect} from "react";
import "./App.css";
import {Routes, Route} from "react-router-dom";
import { useNoteContext } from "./NoteContext";
import qs from 'qs';
import axios from "axios";


// Listen for a global event That comes from note page
import { listen } from '@tauri-apps/api/event';


// pages
import Note from "./pages/Note";
import Home from "./pages/Home";


function App() {
   const {getNotes} = useNoteContext();
 

  // when you create a new note from any of the menus it calls this function to return the note with no content and the id and use that id for the created window 
  const newNote = async () => {
    try {
      const data = qs.stringify({
        content: "",
      });
      const response = await axios.post("http://localhost:8080/notes", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const newId = response?.data?._id?.$oid;
      return newId
    } catch (err) {
      console.log(err);
      throw err; 
    };
  };


  
// DELETE NOTEE
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/notes/${id}`);
      getNotes();
    } catch (error) {
      console.log(error);
    };
  };
 

  // prevent right click
  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, []);


  /* when app is intialized get the notes from api and the getNotes will populate the list. also have a listen 
  for an event inside the NOTE WINDOWS cause cant call functions accross windows so need an event to listen for an emit then call the getnotes function to update the list */

  useEffect(() => {
    getNotes();
    const unlisten = listen('update_notes', () => {
      getNotes();
    });

    return () => {
      unlisten(); 
    }
  }, []);

// TWO ROUTES TWO WINDOWS. MAIN AND THEN NOTE WINDOWS
  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<Home deleteNote={deleteNote}  newNote={newNote}  />}/>
      <Route path="/note/:id" element={<Note newNote={newNote}   />}/>
    </Routes>
    </div>
  );
}

export default App;
