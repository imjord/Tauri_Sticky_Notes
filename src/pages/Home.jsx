import React from 'react'
import Menu from "../components/Menu/Menu";
import Title from "../components/Title/Title";
import Search from "../components/Search/Search";
import List from "../components/List/List";

const Home = (props) => {
  const {notes, loading} = props;
  return (
   <div>
    <Menu />
 <main>
    <Title />
    <Search />
    <List   notes={notes} loading={loading} />
    </main>
   </div>
   
  )
}

export default Home