import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useNoteContext } from '../../NoteContext';


import "./Search.css";
const Search = () => {
  const { setIsSearching, setSearchError, setGotSearch, gotSearch} = useNoteContext();
  const [search, setSearch] = useState("");
  const typingTimeout = useRef(null); 
  const [isTyping, setIsTyping] = useState(false);


  const searchTyping = (e) => {
    setSearch(e.target.value)
    setIsSearching(true);
    clearTimeout(typingTimeout.current);

    // Set a new timeout to determine if typing has stopped
    typingTimeout.current = setTimeout(() => {
    setIsTyping(false);
    updateSearchList(e.target.value);
  
    }, 3500); // Adjust the delay as needed
    // Indicate that the user is typing
    setIsTyping(true);
  }  


 
  const updateSearchList = async (content) => {
    try {
      setIsSearching(true);
      const response = await axios.get(`http://localhost:8080/notes/note/${content}`)
      setIsSearching(false);
      setSearchError("");
      setGotSearch(response)
      console.log(response.data)
      console.log(gotSearch)
    } catch (err) {
      setIsSearching(false);
      console.log(err);
      setSearchError(err.response.data);
    }
  }



  useEffect(() => {
    console.log(gotSearch); // You can access the updated gotSearch here

  }, [gotSearch, updateSearchList])

  return (
    <div className='search'>
      <div className='search-wrapper'>
      <input placeholder='Search...' type='text' onChange={searchTyping} />
      <FontAwesomeIcon id='search-x' icon={faXmark} /> 
      <FontAwesomeIcon id='search' icon={faMagnifyingGlass} />
      </div>
     
    </div>
  )
}

export default Search