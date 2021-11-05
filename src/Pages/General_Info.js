import React, { useState, useEffect } from 'react'

// Components
import { Button } from './../Components/Buttons.js'
import { Editbox } from './../Components/Editbox.js'

// File Upload
import  { FaUpload } from 'react-icons/fa'

// SCSS
import './../SCSS/GeneralInfo.scss'

// Normal Pic
import pic from './../Assets/avatar.png'

// Lottie Animations
import  LottieAnimation  from './../Animations/Leaf_Animation/Leaf_Animation'
import loading from './../Animations/Loading1.json'

export const GeneralInfo = () => {

    useEffect(() => {
        handleView()
    }, [])

    const [ image, setImage ] = useState(null)

    const [photo , setPhoto] = useState(pic)

    const [ Loading , setLoading ] = useState(0)

    let data

    const handleView = async () => {
        setLoading(1)

        try {
                const res3 = await fetch('/getData', {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            data = await res3.json()
            if (data.ProfileImage != null){
                setPhoto(`http://localhost:5000/img/${data.ProfileImage}`)
            }

        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(0)
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()

        try {

            const res1 = await fetch('/getData', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            data = await res1.json()

            if (res1.status === 401 || !data) {
                throw new Error("Data Not Found")
            }
            
             // Adding Image File to Form Data
            const formData = new FormData()
            formData.append("image", image)
            formData.append("User_id",data._id)

            const res = await fetch('/uploadImage', {
                method : "POST",
                body : formData
            })

            handleView()

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className = "General_settings_container">

            <div className = "General_settings_wrapper">
                  
                <div className = "General_settings_profile_img">
                    <div className = "Profile_Pic">             
                    {Loading ? (
                        <LottieAnimation lotti = {loading} width = '300px'></LottieAnimation>
                    ) : (
                        <img src = {photo} alt = 'Profile Pic'></img>
                    )}
                    </div>

                    <form>
                        <input type = "file" onChange = {(e) => setImage(e.target.files[0])}></input>
                        <Button buttonStyle = 'btn--icon' buttonColor = 'green' onClick = {handleUpload}><FaUpload/></Button>
                    </form>
                </div>

                <div className = "General_settings_form">
                    <Editbox type = "text" label = "Username" value = "Ajay Mishra" icon = '1'></Editbox>
                    <Editbox type = "text" label = "Fathers Name" value = "Pramod Kumar Mishra" icon = '1'></Editbox>
                    <Editbox type = "text" label = "Jee Mains Rank" value = "1232281212" icon = '4'></Editbox>
                    <Editbox type = "text" label = "Address" value = "270 A 2 Sadanand Nagar Ahirwan Chakeri Kanpur" icon = '4'></Editbox>
                    <div className = "General_info_buttons">
                        
                        <Button 
                                buttonStyle = 'btn--outline'
                                buttonColor = 'blue' 
                                buttonSize = 'btn--wide' >
                                    Submit
                        </Button>   

                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralInfo
