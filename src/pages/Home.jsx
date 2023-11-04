import React from 'react'
import Menu from "../components/Menu/Menu";
import Title from "../components/Title/Title";
import Search from "../components/Search/Search";
import List from "../components/List/List";

const Home = (props) => {
  const {notes,   noteId, loading, noNotes, newNote} = props;
  return (
   <div>
    <Menu    noteId={  noteId}   newNote={newNote} />
 <main>
    <Title />
    <Search />
    <List   noNotes={noNotes} notes={notes} loading={loading} />
    </main>
   </div>
   
  )
}

export default Home