import React, {useState} from 'react'

//SCSS
import './../SCSS/DropDownList.scss'


export const DropDownList = () => {
    
    const choices = ['Rice', 'Wheet', 'Masala', 'Scorpion']
    choices.map(ele => {
        console.log(ele)
    })

    return (
        <div className = "DropDownList_Container">
            <select name = "Elements">

                {choices.map(element => {
                    return (
                        <option value = {element}>{element}</option>
                    )
                })}

            </select>
        </div>
    )
}

export default DropDownList