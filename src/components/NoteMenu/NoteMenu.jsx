import "./NoteMenu.css";
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faEllipsis  } from '@fortawesome/free-solid-svg-icons'
import { appWindow,  WebviewWindow } from "@tauri-apps/api/window";
import { emit } from '@tauri-apps/api/event';


const NoteMenu = (props) => {
  const { newNote} = props;

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