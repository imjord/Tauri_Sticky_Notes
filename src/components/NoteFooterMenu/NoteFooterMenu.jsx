import React, { useEffect, useState } from 'react'
import "./NoteFooterMenu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBold , faItalic, faUnderline, faStrikethrough, faList, faImage, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNoteContext } from '../../NoteContext'
import { useLocation } from 'react-router-dom'
import qs from 'qs';
import axios from "axios";
import { emit } from '@tauri-apps/api/event';


const NoteFooterMenu = () => {
  let location = useLocation();
  const { note} = useNoteContext();
  const [id, setId] = useState("");

  // need to make this an update to the note //location param
  // update the note cause notes are blank on start. need to change to reflect the updated notestrsejgpahejbapejboanebosznebrtso;ejb
  const addNote = async (id) => {
    try {
      const data = qs.stringify({
        content: note,
      });
      const response = await axios.put(`http://localhost:8080/notes/${id}`, 
      {
        content: note
      }
        
      );
      emit('update_notes');

    } catch (err) {
      console.log(err);
    }
  }


  // get the url from the window /note/:id
  const getPath = () => {
    const pathname = location.pathname;
    const match = pathname.match(/\/note\/(\w+)/);
    setId(match[1])
  }

  // get the path on note created so add to id state
  useEffect(() => {
    getPath()
  }, [])



  // need to get rid of the check mark just and have it update like how the sticky notes does just placeholder for now to update notes
  return (
    <footer>
      <div className='footer-wrapper'>
      <div>
        <FontAwesomeIcon icon={faBold} />
      </div>
      <div>
      <FontAwesomeIcon icon={faItalic} />
      </div>
      <div>
      <FontAwesomeIcon icon={faUnderline} />
      </div>
      <div>
      <FontAwesomeIcon icon={faStrikethrough} />
      </div>
      <div>
      <FontAwesomeIcon icon={faList} />
      </div>
      <div>
      <FontAwesomeIcon icon={faImage} />
      </div>
      <div>
      <FontAwesomeIcon onClick={() => addNote(id)} icon={faCheck} />  
      </div>
      </div>
      </footer>
  )
};

export default NoteFooterMenu