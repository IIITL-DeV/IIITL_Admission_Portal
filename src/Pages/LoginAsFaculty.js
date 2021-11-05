import React, {useEffect} from 'react'

// Components
import { Editbox} from './../Components/Editbox.js'
import { Button } from './../Components/Buttons.js'

// Lottie Animation
import  LottieAnimation  from './../Animations/Leaf_Animation/Leaf_Animation.js'
import  Pic  from './../Animations/studentsStudying.json'

// SCSS
import './../SCSS/LoginAsFaculty.scss'

export const LoginAsFaculty = () =>  {

    useEffect(() => {
        console.log("HELLO")
    }, [])

    return (
        <div className = "LoginFaculty_container">
            
        <div className = "LoginAsFaculty_container">
            <div className = "LoginAsFaculty_imgBox">
                <LottieAnimation lottie = {Pic} width = '280px'></LottieAnimation>
            </div>
            
            <div className = "LoginAsFaculty_inputBox">
            <form>
                    <div className = "LoginPage_fields">
                        <Editbox type = "text" name = "Username" icon = "1" label = "Username"  ></Editbox>
                        <Editbox type = "password" name = "password" label = "Password" icon = "3" ></Editbox>
                    </div>

                    <div className = "LoginPage_submit">
                    <Button  
                        buttonStyle = 'btn--outline' 
                        buttonColor = 'blue' 
                        buttonSize = 'btn--wide' >
                        Login
                    </Button>   
                    </div>
                </form>
            </div>
        </div>

        </div>
    )
}

export default LoginAsFaculty