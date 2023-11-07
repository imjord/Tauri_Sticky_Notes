import React from 'react';
import "./Settings.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faToggleOff, faCircle as cirlce } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons';

const Settings = () => {
  return (
    <div className='settings'>
        <div className='account-container'>
            <div className='account-wrapper'>
            <div className='account-picture'>
                <div>
                <FontAwesomeIcon id='avatar' icon={faUserAstronaut} />

                </div>
            </div>
            <div className='account-content'>
                <p>imjord</p>
                <p>imjord @ github</p>
                <p className='sign-out'>Sign out</p>
            </div>
            </div>
            
        </div>
        <div className='general-container'>
            <div className='general-wrapper'>
                <div className='general-title'>
                    <h3>General</h3>
                </div>
                <div className='insights'>
                    <div><p>Enable insights</p></div>
                    <div><FontAwesomeIcon id='toggle-off' icon={faToggleOff} /> <p>Off</p></div>
                </div>
                <div className='confirm-delete'>
                <div><p>Confirm before deleting</p></div>
                    <div><FontAwesomeIcon id='toggle-off' icon={faToggleOff} /> <p>Off</p></div>
                
                </div>
            </div>
        </div>
        <div className='color-settings'>
            <div className='color-wrapper'>
            <div className='color-title'>
            <h3>Color</h3>

            </div>
            <div className='dots'>
                <div><FontAwesomeIcon icon={faCircle}/> <p>Light</p> </div>
                <div><FontAwesomeIcon icon={cirlce}/> <p>Dark</p> </div>
                <div><FontAwesomeIcon icon={faCircle}/> <p>Use my windows mode</p> </div>
            </div>
            </div>
         
        </div>
        <div className='feedback'>
            <div className='feedback-wrapper'>
                <div><h3>Help & Feedback</h3></div>
                <div>
                    <p>Help</p>
                    <p>Share feedback</p>
                    <p>Star me</p>
                    <p>Copy Session ID</p>
                </div>
            </div>
        </div>
        <div className='about'>
        <div className='about-wrapper'>
                <div><h3>About</h3></div>
                <div>
                    <p>Tauri Sticky Notes 0.1.0</p>
                    <p> 2023 imjord on github </p>
                </div>
                <div>
                    <p>Export notes</p>
                    <p>Share feedback</p>
                    <p>Star me</p>
                    <p>Copy Session ID</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Settings