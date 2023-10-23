import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus,faGear  } from '@fortawesome/free-solid-svg-icons'
import { appWindow } from "@tauri-apps/api/window";
import "./Menu.css";
const Menu = () => {
  return (
    <div  className='menu'>
        <div data-tauri-drag-region className='menu-wrapper'>
        <div className='add-note-plus'>
            <div>
            <FontAwesomeIcon id='plus-icon' icon={faPlus} />
                </div>
        </div>
        <div className='menu-right'>
            <div>
            <FontAwesomeIcon id='setting-icon' icon={faGear} />

            </div>
            <div>
            <FontAwesomeIcon id='close' icon={faXmark} onClick={() => appWindow.minimize()} />

            </div>
        </div>
        </div>
        
    </div>
  )
}

export default Menu