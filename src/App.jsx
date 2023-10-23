import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { relaunch, exit } from "@tauri-apps/api/process";
import Menu from "./components/Menu/Menu";
import Title from "./components/Title/Title";
import Search from "./components/Search/Search";
import List from "./components/List/List";
function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="app">
      <Menu />
      <main>
      <Title />
      <Search />
      <List />
      </main>
    </div>
  );
}

export default App;
