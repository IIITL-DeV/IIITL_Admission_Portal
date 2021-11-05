import React, { useState, useEffect } from 'react'

// Document
import Document from './../Assets/document.png'
import done from './../Assets/done.png'

// SCSS
import './../SCSS/PdfViewer.scss'

// Componenet
import { Button } from './../Components/Buttons.js'

// File Upload
import  { FaUpload, FaSearch } from 'react-icons/fa'
import { FiDelete } from 'react-icons/fi'

// Loading Animations
import  LottieAnimation  from './../Animations/Leaf_Animation/Leaf_Animation'
import Loading from './../Animations/Loading1.json'


export const PdfViewer = ({label,onclick}) => {
    
    // Store Document
    const [file, setfile] = useState(null)

    // Changing Between upload and normal states
    const [status, setStatus] = useState(1)

    // To check a file is approved or not
    const [state, setState] = useState(false)

    useEffect(() => {
        handleDataUpload()
    },[])

    const handleDataUpload = async () => {
        setStatus(2)

        try {

            // Get users Data
            const res = await fetch('/getData' , {
                method: "GET",
                headers: {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res.json()

            console.log(data)


            if (res.status === 401 || data == null){
                throw new Error("Data Not Found")
            }

            if (data.Certificates[0].filename && data.Certificates[0].status > 0){
                setStatus(3)
            } else {
                setStatus(1)
            }
        } catch (err) {
            console.log(err)
            setStatus(1)
        }
    }


    // Upload Documents
    const handleUpload = async(event) => {
        event.preventDefault()
        setStatus(2)

        try {
            const res1 = await fetch('/getData', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res1.json()
            if (res1.status === 401 || !data) {
                throw new Error("Data Not Found")
            }
            
             // Adding Pdf File to Form Data
            const formData = new FormData()
            formData.append("file",file)
            formData.append("User_id",data._id)

            const res = await fetch('/uploadDoc', {
                method : "POST",
                body : formData
            })

            if (res.status === 400){
                throw new Error("Failed The Upload")
            }

            setStatus(3)

        } catch (err) {
            console.log(err)
            setStatus(1)
        }
    }

    // Deleting the file from the database
    const handleDelete = async () => {

        // Transitioning to loading Screen
        setStatus(2)

        try {

            // Getting User Details From the Database            
            const res1 = await fetch('/getData', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            const data = await res1.json()
            if (data.status === 401 || !data) {
                throw new Error(res1.err)
            }

            const filename = data.Certificates[0].filename
            const User_id = data._id

            if (!data.Certificates[0].filename){
                throw new Error("Upload File First")
            }

            // Deleting The Actual File from The Database
            const res2 = await fetch('/delFile', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    filename, User_id
                })
            })

            if (res2.status === 400){
                throw new Error("Try Again")
            }

            // Transitioning to file Picker
            setStatus(1)
            setState(false)
        } 
        catch (err) {
            console.log(err)
            setStatus(3)
            setState(false)
        }
    }

    const handleView = () => {
        
    }

    return (
        <div onClick = {onclick}>
            <form>
            <div className = "PDf_Viewer_Card">

            <div className = "Pdf_Preview">
                { (status == 1 ) ? (
                    <img src = {Document} alt = "No Document"></img>
                    ) : (( status === 2 ) ? (
                        <LottieAnimation lotti = {Loading} width = '154px'></LottieAnimation>
                    ) : (
                        <img src = {done} alt = "No Document"></img>
                    )
                )}   
            </div>
                
            <h6 className = "Pdf_label">{label}</h6>

            <div className = "Pdf_buttons">
                    
                <div className = "Pdf_filepicker">
                    { (status === 1 ) ? (
                        <input id = "file" name = "file" type = "file" onChange = {(e) => setfile(e.target.files[0])}></input>
                        ) : (( status === 2 ) ? (
                            <div></div>
                        ) : (state ? ( 
                            <div className = "file_status_success">
                                <span>Status :</span>
                                <span>Pending Approval</span>
                            </div>) : (<div className = "file_status_pending">
                                <span>Status :</span>
                                <span>Pending Approval</span>
                            </div>
                            )
                        )
                    )}   
                </div>

                <div className = "Pdf_upload_button">
                    {(status === 1) ? (    
                        <Button buttonStyle = 'btn--icon' buttonColor = 'green' onClick = {handleUpload}><FaUpload/></Button>
                        ) : ((status === 2) ? (
                            <div></div>
                            ) : (  <div className = "Pdf_uploaded_buttons">
                                <Button buttonStyle = 'btn--icon' buttonColor = 'red' onClick = {handleDelete}><FiDelete/></Button>
                                <Button buttonStyle = 'btn--icon' buttonColor = 'yellow' onClick = {handleView}><FaSearch/></Button>
                            </div>
                        ))}
                    </div>
                </div>   
             </div>
            </form>
        </div>
    )
}

export default  PdfViewer 