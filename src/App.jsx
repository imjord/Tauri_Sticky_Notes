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
  const [noteContent, setNoteContent] = useState("");
  
  const getNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/notes");
      setNotes(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const addNote = async () =>  {
    try {
      const data = qs.stringify({
        content: noteContent,
      });
      const response = await axios.post("http://localhost:8080/notes", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

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
      <Route path="/" element={<Home notes={notes} loading={loading}/>}/>
      <Route path="/note/:id" element={<Note addNote={addNote} setNoteContent={setNoteContent} noteContent={noteContent}  />}/>
    </Routes>
    </div>
  );
}

export default App;
