import "./NoteMenu.css";
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faEllipsis  } from '@fortawesome/free-solid-svg-icons'
import { appWindow,  WebviewWindow } from "@tauri-apps/api/window";
import { emit } from '@tauri-apps/api/event';
import { invoke } from "@tauri-apps/api";


const NoteMenu = (props) => {
  const { newNote} = props;
  const [colorDropdown, setColorDropdown] = useState(false);


  const handleColorDropdown = () => {
    setColorDropdown(!colorDropdown);
    console.log(colorDropdown)
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

    return (
      <div  className='note-menu'>
             {colorDropdown ?  (
          <div className="note-dropdown">
              <div className="colors">
                <div className="blue">
                  
                </div>
                <div className="yellow">
                
                  </div>
                  <div className="green">
               
                  </div>
                  <div className="pink">
                
                  </div>
                  <div className="purple">
                
                  </div>
                  <div className="gray">
                
                  </div>
                  <div className="black">
             
                  </div>
              </div> 
              <div className="note-list-drop">
                
              
              </div> 
              <div className="delete-list-drop"> 


              </div>
                
          </div>
          ) :     <div data-tauri-drag-region className='note-menu-wrapper'>
          <div className='note-add-note-plus' onClick={createWindow} title='New note'>
              <div>
  
              <FontAwesomeIcon  id='plus-icon' icon={faPlus}  />
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