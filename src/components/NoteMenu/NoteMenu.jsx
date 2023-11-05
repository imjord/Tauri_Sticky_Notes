import "./NoteMenu.css";
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus,faGear, faEllipsis  } from '@fortawesome/free-solid-svg-icons'
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { useNoteContext } from '../../NoteContext';

const NoteMenu = (props) => {
  const { newNote} = props;
  const {getNotes} = useNoteContext();
  const createWindow = async () => {
    try {
      const noteId = await newNote();
      if (noteId) {
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
          console.log('ghergjvaePOOP')
          getNotes();
        });
        View.once("tauri://error", function (e) {
          console.log(e);
        });
      } else {
        console.log("Note ID is empty.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=> {
 
  })
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
              <div title='Close window' onClick={() => appWindow.close()}>
              <FontAwesomeIcon id='close' icon={faXmark}  />
  
              </div>
          </div>
          </div>
          
      </div>
    )
}

export default NoteMenu