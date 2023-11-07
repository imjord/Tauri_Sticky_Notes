import React, { useState } from 'react'
import Menu from "../components/Menu/Menu";
import Title from "../components/Title/Title";
import Search from "../components/Search/Search";
import List from "../components/List/List";
import Settings from '../components/Settings/Settings';

const Home = (props) => {
  const {deleteNote, newNote} = props;
  const [settingsView, setSettingsView] = useState(false);

  const changeView = () => {
    setSettingsView(!settingsView);
  };

  return (
   <div>
    <Menu settingsView={settingsView} setSettingsView={setSettingsView} newNote={newNote} changeView={changeView} />
    <main>
      {settingsView ? <Settings/> : <div>
      <Title />
    <Search />
    <List deleteNote={deleteNote}   />
        </div>}
   
    </main>
   </div>
   
  )
}

export default Home