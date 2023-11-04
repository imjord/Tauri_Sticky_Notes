import React, { useEffect, useState } from 'react'
import "./NoteCard.css";
import spinner from "../../assets/spinner.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faE, faEllipsis  } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";


const NoteCard = (props) => {
  const {notes, deleteNote, loading} = props;
  const [content, setContent] = useState("");
  const getDateMade = (noteDate) => {
    const date = new Date(noteDate * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }


  const createWindow = async (windowId) => {
    try {

        const View = new WebviewWindow(`${windowId}`, {
          url: `/note/${windowId}`,
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
        });
        View.once("tauri://error", function (e) {
          console.log(e);
        });
      } catch (err) {
      console.log(err);
    }
  };


    // // Function to handle deleting a note
    // const handleDeleteNote = (e, noteId) => {
    //   e.stopPropagation();
    //   deleteNote(noteId);
  
    //   // Remove the note from local storage by its ID
    //   const updatedNotes = notes.filter((myNote) => myNote._id?.$oid !== noteId);
    //   localStorage.setItem('notes', JSON.stringify(updatedNotes));
    // }

  useEffect(() => {

  }, [])


  return (
    <div className='card'>
      {loading ? <img id='loading' src={spinner} /> :
      <div>
            {notes.map((myNote, index) => {
        return (
       
          <div

          onClick={() => createWindow(myNote?._id?.$oid)}

          key={myNote?._id?.$oid} 
           className='card-wrapper' style={
            
            myNote.color === "Yellow"
              ? { borderTop: '2px solid rgb(255, 208, 0)'  }
              : myNote.color === "Blue"
              ? { borderTop: '2px solid #aed7f9'   
            }
              : null
          }>
          <div className='card-time'>
           <p
           style={
            myNote.color === "Yellow"
              ? { color: 'rgb(255, 208, 0)' }
              : myNote.color === "Blue"
              ? { color: '#aed7f9' }
              : null
          }
          >
            <FontAwesomeIcon onClick={(e) => {
              handleDeleteNote(e, myNote?._id?.$oid)} 
            } id='delete' icon={faEllipsis} />
            {getDateMade(myNote?.date?.secs_since_epoch)}</p>
          </div>
          <div className='card-content'>
              <p>{myNote.content}</p>
          </div>
          </div>
        )
      })}
        </div>
   
      }
       
        
  
</div>
  )
}

export default NoteCard