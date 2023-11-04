import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { relaunch, exit } from "@tauri-apps/api/process";
import Menu from "./components/Menu/Menu";
import Title from "./components/Title/Title";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import {Routes, Route} from "react-router-dom";
import qs from 'qs';


// pages
import Note from "./pages/Note";
import Home from "./pages/Home";
import axios from "axios";
function App() {
  const [notes, setNotes] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [noNotes , setNoNotes] = useState(false);
  const [  noteId, setNoteId] = useState(null); 

  const getNotes = async () => {
    
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/notes");
      setNotes(response.data);
      console.log('WIHGWARHGAIWEUHGIAEHG')
      setLoading(false);
    } catch (err) {
      console.log(err);
      if(err.response.data === "no notes found"){
        setNoNotes(true);
        setLoading(false);
      }
    }
  }


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
      return newId; // Return the updated value
    } catch (err) {
      console.log(err);
      throw err; // Re-throw the error
    }
  }

  // const  addNote  = async () =>  {
  //   try {
  //     const data = qs.stringify({
  //       content: noteContent,
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
  

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/notes/${id}`);
      getNotes();
    } catch (error) {
      console.log(error);
    }

  }
 

  useEffect(() => {
    getNotes();

  }, [])
  return (
    <div className="app">
   
    <Routes>
      <Route path="/" element={<Home deleteNote={deleteNote} getNotes={getNotes}   noteId={  noteId}   newNote={newNote} noNotes={noNotes} notes={notes} loading={loading}/>}/>
      <Route path="/note/:id" element={<Note  getNotes={getNotes}   noteId={  noteId} newNote={newNote}   />}/>
    </Routes>
    </div>
  );
}

export default App;
