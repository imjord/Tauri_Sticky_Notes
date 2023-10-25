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

// pages
import Note from "./pages/Note";
import Home from "./pages/Home";
function App() {
 
  

 

  useEffect(() => {
  
  })
  return (
    <div className="app">
      <Menu  />
    <Routes>
      <Route path="/" element={<Home  />}/>
      <Route path="/note/:id" element={<Note  />}/>
    </Routes>
    </div>
  );
}

export default App;
