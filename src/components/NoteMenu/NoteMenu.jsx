import "./NoteMenu.css";
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus,faGear, faEllipsis  } from '@fortawesome/free-solid-svg-icons'
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { useNoteContext } from '../../NoteContext';

const NoteMenu = () => {
    const { noteId, setNoteId } = useNoteContext();


    const createWindow = async () => {
      setNoteId(prevNoteId => prevNoteId + 1);
  
      const addNoteView = new WebviewWindow(`note${noteId}`, {
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
      
      addNoteView.once("tauri://created", function () {
        console.log(getCurrent().label);
      });
      addNoteView.once("tauri://error", function (e) {
        console.log(e);
      });
    
      };
    
    return (
      <div  className='note-menu'>
          <div data-tauri-drag-region className='note-menu-wrapper'>
          <div className='note-add-note-plus' onClick={createWindow} title='New note'>
              <div>
  
              <FontAwesomeIcon  id='plus-icon' icon={faPlus}  />
                  </div>
          </div>
          <div className='note-menu-right'>
              <div title='Settings'>
              <FontAwesomeIcon id='setting-icon' icon={faEllipsis} />
  
              </div>
              <div title='Close window'>
              <FontAwesomeIcon id='close' icon={faXmark} onClick={() => appWindow.close()} />
  
              </div>
          </div>
          </div>
          
      </div>
    )
}

export default NoteMenu