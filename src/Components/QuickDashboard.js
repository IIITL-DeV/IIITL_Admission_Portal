import React, { useState, useEffect } from 'react'

// Image
import Mohit from './../Assets/mohit.jpg'

// SCSS
import './../SCSS/QuickDashboard.scss'

// Icons 
import { FaForward, FaBackward } from 'react-icons/fa'

// Components
import { Button } from './../Components/Buttons'
import { Link } from 'react-router-dom'

export const QuickDashboard = () => {

    useEffect(() => {
        onLoading()
    }, [])

    // For Hiding the Dashboard
    const [click, setClick] = useState(false)

    // Handling hiding of the Dashboard
    const handleClick = () => {
        setClick(!click)
    }

    const [ user, setUser] = useState({})


    // All Documents
    const Documents = ["Jee Mains Result","Covid Report", "Transfer Certificate", "College Fee Structure", "Application Fee"]

    const [ progress , setProgress ] = useState([0,1,2,3,4])

    const [photo, setPhoto] = useState(Mohit)
    
    const onLoading = async () => {

        try {

            const res = await fetch('/getData', {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            }) 

            const data = await res.json()
            setUser(data);

            progress.map((e,idx) => {
                if (idx < data.Certificates.length){
                    progress[idx] = data.Certificates[idx].status
                }
                else progress[idx] = 0
            })

            setProgress(progress)
            if (data.ProfileImage != null){
                setPhoto(`http://localhost:5000/img/${data.ProfileImage}`)
            }


        }catch (err) {
            console.log(err)
        }
    }

    
    return (
        <div>
                <div className = {click ? "QuickDashboard" : "QuickDashboard hide"}>

                    <div className = "QuickDashboard-wrapper">
                   
                        <div className = "QuickDashboard-img-wrapper">
                            <img src = {photo} alt = "Profile_dp"></img>
                        </div>

                        <div className = "QuickDashboard-Name">
                            {user.Username}
                        </div>

                        <div className = "QuickDashboard_certificates">
                            {Documents.map((doc,idx) => {
                                return (
                                    <div className = "QuickDashboard_certificate">
                                        <span>{doc}</span>
                                        { (progress[idx] == 0) ? (
                                            <span style = {{color : "#FFCB9A"}}> Pending Upload </span>
                                        ): (
                                            (progress[idx] > 0 && progress[idx] < 4) ? (
                                                <span style = {{color : "#FEE400"}}> Pending Approval </span>
                                            ) : (
                                                <span style = {{color : "#66FCF1"}}> Approved</span>
                                            )
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        
                        <div className = "QuickDashboard_buttons">
                            <Button buttonColor = "blue" buttonSize = "btn--small"> Pay Now </Button>
                            <Link to = './GeneralInfo'>
                                <Button buttonColor = "green" buttonSize = "btn--small"> Change General Settings</Button>
                            </Link>
                        </div>

                    </div>

                    <div className = "QuickDashboard-icon">

                        <div className = "QuickDashboard-button" onClick = {handleClick}>
                            {click ? <FaForward/> : <FaBackward/> }
                        </div>

                    </div>
            </div>

        </div>
    )
}

export default QuickDashboard