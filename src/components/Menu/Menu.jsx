import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus,faGear, faAngleLeft  } from '@fortawesome/free-solid-svg-icons'
import { appWindow, WebviewWindow } from "@tauri-apps/api/window";
import { useNoteContext } from '../../NoteContext';
import "./Menu.css";
import { invoke } from "@tauri-apps/api";

const Menu = (props) => {

  const { newNote, settingsView, setSettingsView, changeView } = props;
  const { getNotes } = useNoteContext();


  // create a new window and assin its label/note url to the id thats returned from the newnote func in app.jsx
  const createWindow = async () => {
    try {
      const noteId = await newNote();
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
          getNotes(); // dont have to emit because this happens in the main window i believe 
          invoke("set_note_shadow", {label: View.label}); // shadow for the created winow
         });
        View.once("tauri://error", function (e) {
          console.log(e);
        });
    
    } catch (err) {
      console.log(err);
    }
  };
  
  // menu to create new notes and close main window
  return (
    <div  className='menu'>
        
          {settingsView ? <div data-tauri-drag-region className='menu-wrapper'>
            <div className='add-note-plus' onClick={changeView} title='New note'>
            <div>
            <FontAwesomeIcon  id='plus-icon' icon={faAngleLeft}  />
             </div>
        </div>
        <p className='settings-p'>Settings</p>
        <div className='menu-right'>
           <div></div>
            <div title='Close window'>
            <FontAwesomeIcon id='close' icon={faXmark} onClick={() => appWindow.close()} />
            </div>
        </div> 
            
             </div> : <div data-tauri-drag-region className='menu-wrapper'>
             <div className='add-note-plus' onClick={createWindow} title='New note'>
            <div>
            <FontAwesomeIcon  id='plus-icon' icon={faPlus}  />
                </div>
        </div>
        <div className='menu-right'>
            <div title='Settings'>
            <FontAwesomeIcon onClick={changeView} id='setting-icon' icon={faGear} />
            </div>
            <div title='Close window'>
            <FontAwesomeIcon id='close' icon={faXmark} onClick={() => appWindow.close()} />
            </div>
        </div>
              
              </div>}
     
        
    </div>
  )
}

export default Menu