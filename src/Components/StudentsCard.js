import React, { useState, useRef, useEffect } from 'react'

// SCSS
import './../SCSS/StudentsCard.scss'

// Assets
import Mohit from './../Assets/mohit.jpg'

// Icons
import { FaBorderStyle, FaChevronCircleDown, FaChevronCircleUp, FaSearch } from 'react-icons/fa'
import { MdDelete, MdCheck } from 'react-icons/md'

// Components
import { Button } from './../Components/Buttons.js'
import { Editbox } from './../Components/Editbox.js'


// Framer Motion
import { motion } from 'framer-motion'

export const StudentsCard = (props) => {

    useEffect(() => {
        onLoading()
    }, [])

    // Toggling between active and non active
    const [active , setActive] = useState("");

    // Setting height of hidden content
    const [height, setHeight] = useState("0px")

    const [del, setDel] = useState(false)

    const content = useRef(null)

    const All_Docs = ["Jee Mains Result","Covid Report", "Transfer Certificate", "College Fee Structure"]

    const [ Documents, setDocuments] = useState([])

    // Handling Change
    const onHandleChange = (event) => {
        props.users.Certificates[0].message = event.target.value
    }

    // Loading Documents of the users
    const onLoading = async () => {
        console.log(props)
        
        const data = props.users.Certificates

        data.map((e,idx) => {
            if (e.status <= 2){
                setDocuments(Documents.concat(All_Docs[idx]))
            }
         })
    }

    // handling collapse
    const handleCollapse = () => {
        setActive(active == "" ? "active" : "")
        setHeight(active == "active" ? "0px" : `${content.current.scrollHeight}px`)
    }


    // Handling Submit
    const handleSubmit = async (event) => {
        event.preventDefault()
        setDel(false)
        console.log(props.users.Certificates[0].message);
        props.users.Certificates[0].status = 0

        try {
            const res = await fetch('/upDatePermissions', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(props.users)
            })
        } catch (err) {
            console.log(err)
        }
    }

    // Opening Documents
    const openInNewTab = () => {
        const filename = props.users.Certificates[0].filename
        const newWindow = window.open(`http://localhost:5000/pdf/${filename}`)
        if (newWindow) {
            newWindow.opener = null
        }
    }

    // Handling Rejecting A document
    const onHandleReject = async () => {
        
        console.log(props)
        setDel(true)
    }

    // Handling Approving a documents
    const onApprove = async () => {

        props.users.Certificates[0].status = 3
        props.users.Certificates[0].message = ""
        
        try {
            const res = await fetch('/upDatePermissions', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(props.users)
            })
            
            console.log(res)

        } catch (err) {
            console.log(err)
        }

    }


    return (
        <div className = {`Students_Card_container ${active}`}>

            <div 
                className = "Students_Card_title"
                onClick = {handleCollapse}>   

                <div className = "Students_Card_Name">
                    <img src = { Mohit }></img> 
                    <div> {props.users.Username}</div>                   
                </div>

                <div className = "Students_Card_status">
                    Jee Main Roll No : 201201312
                </div>

                
                <div className = "Students_Card_status">
                    Contact No : {props.users.phone}
                </div>

                <div className = "Students_Card_Buttons">
                    {active ? <FaChevronCircleUp/> : <FaChevronCircleDown/>}
                </div>

            </div>
 
            <div 
                className = "Students_Card_info_container" 
                ref = {content}
                style = {{ maxHeight : `${height}`}}>

            {del ? (
                <motion.div  
                initial = {{
                    opacity : 0,
                    y : -200
                }}
                animate = {{
                    opacity : 1,
                    y : 0
                }}
                transition = {{
                    type : "ease",
                    duration : "0.5"
                }}
                className = "Delete_message_students"
                >
                    <form className = "Students_card_Reason_Form">
                        <Editbox type = "text" placeholder = "Tell Us Why?" name = "reason" onChange = {onHandleChange}></Editbox>
                        <div>
                            <Button buttonSize = 'btn--small' buttonColor = 'blue' onClick = {handleSubmit} > Submit </Button>
                        </div>
                    </form>
                </motion.div>
            ):(
                
                <div className = "Students_Card_info">
                <img src = {Mohit}></img>

                <div className = "General_info_student_card">
                    
                    <h3>Documents</h3>
                    <div className = "General_info_student_certificates">
                        {Documents.map((e, idx) => {
                        return (
                            <div className = "Students_card_certificates_tag">
                            <div className = "Students_card_certificates_tag_bold"> {e}</div>
                            <span className = "Students_card_certificates_tag_buttons">
                                <Button buttonStyle = 'btn--icon' onClick = {openInNewTab}><FaSearch/></Button>
                                <Button buttonStyle = 'btn--icon' onClick = {onApprove}><MdCheck/></Button>
                                <Button buttonStyle = 'btn--icon' onClick = {onHandleReject}><MdDelete/></Button>
                            </span>
                            </div> 
                        )})}
                    </div>     
                </div>
             </div>
            )}
            </div>
        </div>
    )
}

export default StudentsCard