import React from 'react'
import Menu from "../components/Menu/Menu";
import Title from "../components/Title/Title";
import Search from "../components/Search/Search";
import List from "../components/List/List";

const Home = (props) => {
  const {deleteNote, newNote} = props;

  return (
   <div>
    <Menu newNote={newNote} />
    <main>
    <Title />
    <Search />
    <List deleteNote={deleteNote}   />
    </main>
   </div>
   
  )
}

export default Home