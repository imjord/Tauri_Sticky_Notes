import React, { useEffect, useState } from 'react'
import "./NoteCard.css";
import spinner from "../../assets/spinner.gif";
const NoteCard = (props) => {
  const {notes, loading} = props;



  const getDateMade = (noteDate) => {
    const date = new Date(noteDate * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }


  useEffect(() => {

  }, [])


  return (
    <div className='card'>
      {loading ? <img id='loading' src={spinner} /> :
      <div>
            {notes.map((myNote) => {
        return (
          <div
          key={myNote?._id?.$oid} 
           className='card-wrapper' style={
            myNote.color === "Yellow"
              ? { borderTop: '2px solid rgb(255, 208, 0)' }
              : myNote.color === "Blue"
              ? { borderTop: '2px solid #aed7f9' }
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
          >{getDateMade(myNote?.date?.secs_since_epoch)}</p>
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