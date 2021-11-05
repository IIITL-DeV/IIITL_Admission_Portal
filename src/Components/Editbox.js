import React from 'react'

// SCSS
import './../SCSS/Editbox.scss'

// Icons
import {FaUser,FaLock, FaPhoneAlt} from 'react-icons/fa'
import { MdKeyboard } from 'react-icons/md'  

const icons = [<FaUser/>,<FaPhoneAlt/>,<FaLock/>,<MdKeyboard/>]

export const Editbox = ({ type, label, name, icon, onChange, value,pattern,placeholder}) => {

    const checkInputBoxIcon = (icon > 0 && icons.length >= icon)?icons[icon-1]:""

    return (
        <div className = "Editbox_container"> 
            
            <p className = "Editbox_label">{label}</p>

            <div>
                <i className = "Editbox_icon">{checkInputBoxIcon}</i>
                <input 
                    type = {type}
                    name = {name}
                    value = {value}
                    autoComplete = 'off'
                    className = "Editbox_box"
                    onChange = {onChange}
                    pattern = {pattern}
                    placeholder = {placeholder}>
                </input>
            </div>
        </div>
    )
}

export default Editbox