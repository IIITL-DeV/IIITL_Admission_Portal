import { React , useContext} from 'react'


// Context
import { UserContext } from '../App.js'

// Link
import { Link } from 'react-router-dom'

// Components
import {Button} from './../Components/Buttons'
import QuickDashboard from '../Components/QuickDashboard.js'

// Lottie Animation
import LottieAnimation from './../Animations/Leaf_Animation/Leaf_Animation.js'
import Study from './../Animations/Study.json'

// Framer Motion 
import { motion } from 'framer-motion'

// SCSS
import './../SCSS/Homepage.scss'

export const HomePage = () => {


    // Login Logout State
    const {state, dispatch} = useContext(UserContext)

    return (
        <div className = "HomePage_container">
            {state ? (
                <QuickDashboard></QuickDashboard>
            ): (
                <></>
            )}

            <motion.div 
                initial = {{
                    opacity : 0,
                    x : -35
                }}
                animate = {{
                    opacity : 1,
                    x : 0
                }}
                transition = {{
                    type : "ease",
                    duration : "1"
                }}
            className = "HomePage_description_section">

                < div className = "HomePage_heading">
                    IIITL Admission Portal
                </div>

                <div className = "HomePage_subheading">
                    Exclusive Admission Portal for IIITL Students
                </div>

                <div className = "HomePage_description">
                    A Safe and Secure way to verify the documents of students through onine portal.
                </div>

                {state ? (
                    <div className = "HomePage_Button">
                        <Link to = "./Dashboard">
                            <Button buttonStyle = 'btn--outline' >
                                Open Dashboard
                            </Button>
                        </Link>
                </div>) : (
                        <div className = "HomePage_Button">
                        <Link to = "./Login">
                            <Button buttonStyle = 'btn--outline' >
                                Register
                            </Button>
                        </Link>
                    </div>
                )}

            </motion.div>

            <motion.div 
                initial = {{
                    opacity : 0,
                    x : +35
                }}
                animate = {{
                    opacity : 1,
                    x : 0
                }}
                transition = {{
                    type : "ease",
                    duration : "1"
                }} className = "HomePage_image_section">
                <LottieAnimation lotti = {Study} width = "500px" height = "500px" speed = "0.5"></LottieAnimation>
            </motion.div>

        </div>
    )

}

export default HomePage