import React from 'react'
import "./NoteFooterMenu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBold , faItalic, faUnderline, faStrikethrough, faList, faImage, faCheck } from '@fortawesome/free-solid-svg-icons'
const NoteFooterMenu = (props) => {
  const {addNote} = props;

  return (
    <footer>
      <div className='footer-wrapper'>
      <div>
        <FontAwesomeIcon icon={faBold} />
      </div>
      <div>
      <FontAwesomeIcon icon={faItalic} />
      </div>
      <div>
      <FontAwesomeIcon icon={faUnderline} />
      </div>
      <div>
      <FontAwesomeIcon icon={faStrikethrough} />
      </div>
      <div>
      <FontAwesomeIcon icon={faList} />
      </div>
      <div>
      <FontAwesomeIcon icon={faImage} />
      </div>
      <div>
      <FontAwesomeIcon icon={faCheck} onClick={addNote} />
      </div>
      </div>
      </footer>
  )
}

export default NoteFooterMenu