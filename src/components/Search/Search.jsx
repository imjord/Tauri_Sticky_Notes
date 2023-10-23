import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus,faGear, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons'

import "./Search.css";
const Search = () => {
  return (
    <div className='search'>
      <div className='search-wrapper'>
      <input placeholder='Search...' type='text' />
      {/* when user starts typing have x display show */}
      <FontAwesomeIcon id='search-x' icon={faXmark} /> 
      <FontAwesomeIcon id='search' icon={faMagnifyingGlass} />
      </div>
     
    </div>
  )
}

export default Search