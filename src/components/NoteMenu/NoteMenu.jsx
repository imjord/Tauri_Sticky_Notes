import "./NoteMenu.css";
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faEllipsis , faBarsStaggered, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { appWindow,  WebviewWindow } from "@tauri-apps/api/window";
import { emit } from '@tauri-apps/api/event';
import { invoke } from "@tauri-apps/api";
import { useNoteContext } from '../../NoteContext';
import axios from "axios";


const NoteMenu = (props) => {
  const {setNote, note, setNoteColor, noteColor} = useNoteContext();

  const { newNote, id } = props;
  const [colorDropdown, setColorDropdown] = useState(false);


  const handleColorDropdown = () => {
    setColorDropdown(!colorDropdown);
    console.log(colorDropdown)
  }

const changeNoteColor = async (color) => {
try {
  const response = await axios.put(`http://localhost:8080/notes/color/${id}`, {
    color: color
  });
  console.log(response)
  emit("update_notes")
  window.location.reload();
} catch (error) {
  console.log(error);
}
}
  

  //  note has own create window cause the original stick notes does for whatever reason
  const createWindow = async () => {
    try {
      const noteId = await newNote();
      // if (noteId) {
        const View = new WebviewWindow(`${noteId}`, {
          url: `/note/${noteId}`,
          height: 250,
          width: 310,
          decorations: false,
          fullscreen: false,
          resizable: false,
          title: "Tauri Sticky Notes",
          titleBarStyle: "transparent",
          hiddenTitle: true,
        });
        View.once("tauri://created", function () {
        emit("update_notes")  // emit to the main window that a new window (newNote) was created so update the list to show 
        invoke("set_note_shadow", {label: View.label});
      });
        View.once("tauri://error", function (e) {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };


  const closeDropdown = () => {
    setColorDropdown(false);
  };

  useEffect(() => {



    const handleClickOutside = (e) => {
      if (colorDropdown && e.target.closest('.note-dropdown') === null) {
        // Close the dropdown when clicking outside
        closeDropdown();
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [colorDropdown, changeNoteColor, noteColor]);

    return (
      <div className='note-menu' 
      
      style={{
        backgroundColor:
          noteColor === 'Yellow'
            ? 'yellow'
            : noteColor === 'Blue'
            ? 'blue'
            : noteColor === 'Green'
            ? 'green'
            : noteColor === 'Pink'
            ? 'pink'
            : noteColor === 'Purple'
            ? 'purple'
            : noteColor === 'Gray'
            ? 'gray'
            : noteColor === 'Black'
            ? 'black'
            : '',
      }}
      
      >
             {colorDropdown ?  (
          <div className="note-dropdown">
              <div className="colors">
                <div onClick={() => changeNoteColor("Blue")} className="blue">

                </div>    
                <div onClick={() => changeNoteColor("Yellow")}  className="yellow">
                
                  </div>
                  <div onClick={() => changeNoteColor("Green")}  className="green">
               
                  </div>
                  <div onClick={() => changeNoteColor("Pink")}  className="pink">
                
                  </div>
                  <div onClick={() => changeNoteColor("Purple")}  className="purple">
                
                  </div>
                  <div onClick={() => changeNoteColor("Gray")}  className="gray">
                
                  </div>
                  <div onClick={() => changeNoteColor("Black")}  className="black">
             
                  </div>
              </div> 
              <div className="note-list-drop">
                <div> 
                <FontAwesomeIcon className="list-icon" icon={faBarsStaggered} />
                </div>
                <div>
                <p>Notes List</p>
                </div>
              </div> 
              <div className="delete-list-drop"> 
              <div> 
              <FontAwesomeIcon  className="list-icon"  icon={faTrashCan} />
              </div>
              <div>
                <p>Delete Note</p>
              </div>
            </div>
                
          </div>
          ) :     <div data-tauri-drag-region className='note-menu-wrapper'>
          <div className='note-add-note-plus' onClick={createWindow} title='New note'>
              <div>
  
              <FontAwesomeIcon  id='plus-icon-note' icon={faPlus}  />
                  </div>
          </div>
          <div className='note-menu-right'>
              <div title='Settings' onClick={handleColorDropdown}>
              <FontAwesomeIcon id='setting-icon' icon={faEllipsis} />
              </div>
              <div title='Close window' onClick={() => appWindow.close()}>
              <FontAwesomeIcon id='close' icon={faXmark}  />
              </div>
          </div>
          </div>}
      
     
      </div>
    )
}

export default NoteMenu