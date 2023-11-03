import React from 'react'
import "./NoteFooterMenu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBold , faItalic, faUnderline, faStrikethrough, faList, faImage, faCheck } from '@fortawesome/free-solid-svg-icons'
const NoteFooterMenu = () => {

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
    
      </div>
      </footer>
  )
}

export default NoteFooterMenu