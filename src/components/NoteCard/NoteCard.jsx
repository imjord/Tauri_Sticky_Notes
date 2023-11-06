import React, { useEffect, useState } from 'react'
import "./NoteCard.css";
import spinner from "../../assets/spinner.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faE, faEllipsis, faFolderOpen, faTrashCan  } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { appWindow, getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { useNoteContext } from '../../NoteContext';
import { invoke } from "@tauri-apps/api";


const NoteCard = (props) => {

  const {note, gotSearch, notes, loading } = useNoteContext();

  const {deleteNote} = props;
  const [dropDown, setDropDown] = useState(false);
  const [dropDowns, setDropDowns] = useState(new Array(notes.length).fill(false));
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);



  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
  };





  // change the epoch or whatever the hell rust time is used to a readable time 
  const getDateMade = (noteDate) => {
    const date = new Date(noteDate * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // when you click on a card it opens the window of that specific card id
  const createWindow = async (windowId) => {
    setDropDown(false);
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
          invoke("set_note_shadow", {label: View.label});
        });
        View.once("tauri://error", function (e) {
          console.log(e);
        });
      } catch (err) {
      console.log(err);
    }
  };

  const closeWindow = (id) => {
    const noteWindow = WebviewWindow.getByLabel(`${id}`);
    noteWindow.close();
  };

  // delete notes need to add the dropdown still
    const handleDeleteNote = (e, noteId) => {
      e.stopPropagation();
      closeWindow(noteId);
      deleteNote(noteId);
    }

   // Update the handleDropDown function to accept the index of the card
   const handleDropDown = (e, index) => {
    e.stopPropagation();
    
    // Create a copy of the dropDowns array to avoid mutating the state directly
    const updatedDropDowns = [...dropDowns];
    updatedDropDowns[index] = !updatedDropDowns[index];
    setDropDowns(updatedDropDowns);
  };




    useEffect(() => {
      // Attach a click event listener to the document to handle clicks outside the dropdown
      document.addEventListener('click', handleDocumentClick);
  
      return () => {
        // Clean up the event listener when the component unmounts
        document.removeEventListener('click', handleDocumentClick);
      };
    }, []);
  
    // Function to close the dropdown
    const closeDropdown = () => {
      setDropDown(false);
    };
  
    // Function to handle document click
    const handleDocumentClick = (e) => {
      if (e.target.closest('.card-wrapper') === null) {
        // Click occurred outside the card-wrapper, close the dropdown
        closeDropdown();
      }
    };


useEffect(() => {

}, [gotSearch])

  return (
    <div className='card'>
      {loading ? <img id='loading' src={spinner} /> :
      gotSearch?.data?.content ? (
        <div>
        <p>{gotSearch?.data?.content}</p>
        </div>
      ) :  <div>
      {notes.map((myNote, index) => {
  return (
    <div
    onDoubleClick={() => createWindow(myNote?._id?.$oid)}
    key={myNote?._id?.$oid} 
    onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
     className='card-wrapper' style={  
      myNote.color === "Yellow"
      ? { borderTop: '2px solid rgb(255, 208, 0)' }
      : myNote.color === "Blue"
      ? { borderTop: '2px solid #aed7f9' }
      : myNote.color === "Green"
      ? { borderTop: '2px solid green' }
      : myNote.color === "Pink"
      ? { borderTop: '2px solid pink' }
      : myNote.color === "Purple"
      ? { borderTop: '2px solid purple' }
      : myNote.color === "Gray"
      ? { borderTop: '2px solid gray' }
      : myNote.color === "Black"
      ? { borderTop: '2px solid black' }
      : null


      }>
    <div className='card-time'>
    <FontAwesomeIcon 
    onClick={(e) => {
      e.stopPropagation();
      handleDropDown(e, index);
    }}
    
    className='fae' 
     
      id='delete' 
      icon={faEllipsis} />

     <p id='time'
     style={
      myNote.color === "Yellow"
      ? { color: 'rgb(255, 208, 0)' }
      : myNote.color === "Blue"
      ? { color: '#aed7f9' }
      : myNote.color === "Green"
      ? { color: 'green' }
      : myNote.color === "Pink"
      ? { color: 'pink' }
      : myNote.color === "Purple"
      ? { color: 'purple' }
      : myNote.color === "Gray"
      ? { color: 'gray' }
      : myNote.color === "Black"
      ? { color: 'black' }
      : null
    }
    >
      {getDateMade(myNote?.date?.secs_since_epoch)}</p>
      {hoveredCardIndex === index && dropDowns[index] ? (
        <div className='note-dropdown-list'>
          <div onClick={() => createWindow(myNote?._id?.$oid)}> 
              <FontAwesomeIcon icon={faFolderOpen} />
              <p>Edit Note</p>
             </div>
          <div onClick={(e) => handleDeleteNote(e, myNote?._id?.$oid)}> <FontAwesomeIcon icon={faTrashCan} />
            <p>Delete Note</p>
           </div>
          </div>
      ) : null}
    </div>
    <div className='card-content'>
        <p>{myNote.content}</p>
    </div>
    </div>
  )
})}
  </div>}
     
   
      
</div>
  )
}

export default NoteCard








