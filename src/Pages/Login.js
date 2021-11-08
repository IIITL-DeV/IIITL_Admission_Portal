import React, { useState , useContext} from 'react'

// To use History
import { useHistory } from 'react-router-dom'

// Avatar
import Avatar from './../Assets/avatar.png'

// Componenets
import { Editbox } from './../Components/Editbox'
import { Button } from './../Components/Buttons'

// SCSS
import './../SCSS/Login.scss'

// Lottie Animation
import  LottieAnimation  from './../Animations/Leaf_Animation/Leaf_Animation.js'
import Register from './../Animations/Register.json'
import LoginAnimation from './../Animations/Login.json'
import Load from './../Animations/Loading1.json'

// Framer Motion
import { motion } from 'framer-motion'

// UserContext
import { UserContext } from './../App.js'

export const Login = () => {

    const history = useHistory();

    const [ Loading, setLoading] = useState(false)

    // Error Handling
    const [LoginError , setLoginError ] = useState("")

    // Register Error Handling
    const [RegisterError , setRegisterError ] = useState("")

    // Context
    const {state, dispatch} = useContext(UserContext)

    // For Movable Div
    const [click, setClick] = useState(false)

    const handleClick = () => {
        setClick(!click)
    }

    // For Login Info
    const [user, setUser] = useState({
        Username : "",
        password : ""
    })

    // For Registering as a new User
    const [newUser, setNewUser] = useState({
        Username : "",
        password : "",
        phone : "",
        c_password : "",
        email : ""
    })

    // Setting The Login editbox with the input values
    const Login_handleChange = (event) => {
        let Name = event.target.name
        let value = event.target.value

        setUser({...user, [Name] : value})
    }

    // Setting the Register editbox with the input values
    const Register_handleChange = (event) => {
        let Name = event.target.name
        let value = event.target.value

        setNewUser({...newUser, [Name] : value})
    }

    // Posting Login Data to the Backend
    const Login_PostData = async (event) => {
        event.preventDefault()

        setLoading(true)
        try {
            const { Username, password } = user

            // Fetch Call to the backend
            const res = await fetch('/Signin', {
                method : "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    Username, password
                })
            })
    
            const data = await res.json()
            if (res.status === 201) {
                
                // Changing Current State of UserContext to true For Login Logout
                dispatch({type : "USER", payload : true})
                history.push('/')
                setLoginError("");
            }
            else {
                setLoginError(data.error)
                console.log(data.error)
            }
        } catch (err) {
            setLoginError(err)
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    // Posting Register Data to the Backend
    const Register_PostData = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            
        const { Username, phone, password, email} = newUser

        // Fetch Call to the Backend
        const res = await fetch('/SignUp', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                Username, phone , password, email
            })
        })

        const data = await res.json()
        console.log(res)
        if (res.status === 201) {
            console.log(data)
            setRegisterError("")
            setClick(!click)
        }
        else {
            setRegisterError(data.error)
            console.log(data.error)
        }

        } catch (err) {
            setRegisterError(err)
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className = "Login_Register_Container">

            <div className = "LoginPage_Container">
                
               <h5 className = "LoginPage_Container_Heading">Register</h5>

               <div className = "LoginPage_Container_Avatar">
                    <img src = {Avatar} alt = "Profile"></img>
               </div>

               <div className = "Form_error">{RegisterError}</div>

               <form method = "POST" >
                        <div className = "LoginPage_fields">
                            <Editbox type = "text" name = "Username" icon = "1" label = "Name"  value = {newUser.Username} onChange = {Register_handleChange}></Editbox>
                            <Editbox type = "password" name = "password" icon = "3" label = "Password"  value = {newUser.password} onChange = {Register_handleChange}></Editbox>
                            <Editbox type = "text" name = "phone" label = "Jee Roll no"  icon = "2" value = {newUser.phone} onChange = {Register_handleChange}></Editbox>
                            <Editbox type = "email" name = "email" label = "Email Id"  icon = "4" value = {newUser.email} onChange = {Register_handleChange}></Editbox>
                        </div>

                        <div className = "LoginPage_submit">
                            {Loading ? (
                                <LottieAnimation lotti = {Load} width = '100px'></LottieAnimation>
                            ): (<></>)}

                            <Button 
                            buttonStyle = 'btn--outline'
                            buttonColor = 'blue' 
                            buttonSize = 'btn--wide' 
                            onClick = {Register_PostData}>
                                Register
                            </Button>   
                        </div>
                </form>
            </div>

            <div className = "LoginPage_Container">
                
               <h5 className = "LoginPage_Container_Heading">Login</h5>

                <div className = "LoginPage_Container_Avatar">
                    <img src = {Avatar} alt = "Profile"></img>
                </div>

                <div className = "Form_error">{LoginError}</div>

                <form method = "POST" >
                    <div className = "LoginPage_fields">
                        <Editbox type = "text" name = "Username" icon = "1" label = "Username" value = {user.Username} onChange = {Login_handleChange}></Editbox>
                        <Editbox type = "password" name = "password" label = "Password" icon = "3" value = {user.password} onChange = {Login_handleChange}></Editbox>
                    </div>

                 <div className = "LoginPage_submit">
                        {Loading ? (
                                <LottieAnimation lotti = {Load} width = '100px'></LottieAnimation>
                        ): (<></>)}

                    <Button  
                        buttonStyle = 'btn--outline' 
                        buttonColor = 'blue' 
                        buttonSize = 'btn--wide'
                        onClick = {Login_PostData} >
                        Login
                    </Button>   
                </div>
                </form>
                
            </div>

            <motion.div 
                animate = {{
                    translateX: click?"125%":"0%",
                    borderTopRightRadius: click?"5%":"2%",
                    borderBottomRightRadius: click?"5%":"2%",
                    borderTopLeftRadius: click?"2%":"0%",
                    borderBottomLeftRadius: click?"5%":"0%"
                }}
            
            className = "Movable_Container">
                {click ? (
                    <div className = "Register_Animation">
                        <LottieAnimation lotti = {LoginAnimation} width = "60%"></LottieAnimation>
                        <div className = "movable_container_btn">
                            <Button buttonStyle = 'btn--outline' onClick = {handleClick}>Click here to Login</Button>
                        </div>
                    </div>

                ):(
                    <div className = "Register_Animation">
                        <LottieAnimation lotti = {Register} width = "70%"></LottieAnimation>
                        <div>
                            <Button buttonStyle = 'btn--outline' onClick = {handleClick}>Click here to Register</Button>
                        </div>
                    </div>
                )}
            </motion.div>

        </div>
    )
}

export default Login