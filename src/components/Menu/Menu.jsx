import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus,faGear  } from '@fortawesome/free-solid-svg-icons'
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { useNoteContext } from '../../NoteContext';

import Note from '../../pages/Note';
import "./Menu.css";
const Menu = (props) => {

  const {addNote, newNote, myId} = props;

  const createWindow = async () => {
    try {
      await newNote(); // Wait for newNote to complete
      setTimeout(()=> {
        if (myId) {
          // The myId is available, so you can proceed to create the window
          const addNoteView = new WebviewWindow(`${myId}`, {
            url: `/note/${myId}`,
            height: 250,
            width: 310,
            decorations: false,
            fullscreen: false,
            resizable: false,
            title: "Tauri Sticky Notes",
            titleBarStyle: "transparent",
            hiddenTitle: true,
          });
    
          addNoteView.once("tauri://created", function () {
            console.log(getCurrent().label);
          });
          addNoteView.once("tauri://error", function (e) {
            console.log(e);
          });
        } else {
          console.log("myId is empty. It might take some time to load.");
        }
      }, 2000)
    
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div  className='menu'>
        <div data-tauri-drag-region className='menu-wrapper'>
        <div className='add-note-plus' onClick={createWindow} title='New note'>
            <div>

            <FontAwesomeIcon  id='plus-icon' icon={faPlus}  />
                </div>
        </div>
        <div className='menu-right'>
            <div title='Settings'>
            <FontAwesomeIcon id='setting-icon' icon={faGear} />

            </div>
            <div title='Close window'>
            <FontAwesomeIcon id='close' icon={faXmark} onClick={() => appWindow.close()} />

            </div>
        </div>
        </div>
        
    </div>
  )
}

export default Menu