import React from 'react'

// Components
import { Button } from './../Components/Buttons.js'

// Lottie Animations 
import LottieAnimations from './../Animations/Leaf_Animation/Leaf_Animation.js'
import Student from './../Animations/students.json'
import Teacher from './../Animations/teachers.json'

// SCSS
import './../SCSS/ChoicePage.scss'
import { Link } from 'react-router-dom'


export const ChoicePage = () => {
    return (
        <div className = "Choices_page_container">
            
            <div className = "Choice_As_Students">
                <LottieAnimations lotti = {Student} width = '350px'></LottieAnimations>
                
                <div className = "Choice_buttons">
                    <Link to = '/Login'>
                        
                        <Button buttonStyle = 'btn--outline' >
                            Login As Student
                        </Button>    

                    </Link>
                </div>
            </div>

            <div className = "Choice_As_Faculty">
                <LottieAnimations lotti = {Teacher} width = '350px'></LottieAnimations>
                
                <div className = "Choice_buttons">
                    <Link to = '/LoginFaculty'>
                        
                        <Button buttonStyle = 'btn--outline' >
                            Login As Faculty
                        </Button>    
                        
                    </Link>
                </div>

            </div>
            
        </div>
    )
}

export default ChoicePage
