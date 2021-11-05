import React, { useState , useContext} from 'react'

// Lottie 
import LottieAnimation from './../Animations/Leaf_Animation/Leaf_Animation.js'
import Leaf_Animation from './../Animations/Leaf_Animation/Leaf.json'

// Components
import { Link } from 'react-router-dom'

// SCSS
import './../SCSS/Navbar.scss'

// Icons
import { FaBars, FaTimes} from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi' 

// Context
import { UserContext } from '../App.js'


const Navbar = () => {

    const [click, setClick] = useState(false)

    // Login Logout State
    const {state, dispatch} = useContext(UserContext)
    
    const handleClick = () => setClick(!click)

    return(
        <>
            <div className = "Navbar_container">

                <Link to = './'  className = "Navbar_logo_container">                    

                    <div className = "Navbar_logo">
                        <LottieAnimation lotti = {Leaf_Animation} width = "60px" height = "60px"/>
                    </div>

                    <h3 className = "Navbar_logo_heading">
                        Admission Portal
                    </h3>

                </Link>

                <div className = "Navbar_menu_icons" onClick = {handleClick}>
                    {click ? <FaTimes/> : <FaBars/>}
                </div>

                <ul className = {click ? "Navbar_links active" : "Navbar_links"}>

                    <li className = "Navbar_link" onClick = {handleClick}>
                        <Link to = "./" className = "Navbar_link_name"> Home </Link>
                    </li>
                    
                    <li className = "Navbar_link" onClick = {handleClick}>
                        <Link to = "./About" className = "Navbar_link_name"> About Us </Link>
                    </li>
                    
                    <li className = "Navbar_link" onClick = {handleClick}>
                        <Link to = "./" className = "Navbar_link_name"> Contact Us </Link>
                    </li>

                    {state?(
                        <li className = "Navbar_link">
                            <Link to = './Logout' className = "Navbar_link_name" onClick = {handleClick}> <FiLogOut/> </Link>
                        </li>
                    ):(
                        <li className = "Navbar_link">
                            <Link to = './ChoicePage' className = "Navbar_link_name" onClick = {handleClick}> Login </Link>
                        </li>
                    )}


                </ul>

            </div>
        </>
    )
}

export default Navbar