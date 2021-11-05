import React, { useState, useEffect } from 'react'

// Image
import Mohit from './../Assets/mohit.jpg'

// SCSS
import './../SCSS/ProfilePage.scss'

// Component
import { PdfViewer } from './../Components/PdfPriview.js'
import { Button } from './../Components/Buttons.js'
import { QuickDashboard } from './../Components/QuickDashboard.js'

// import Sample pdf
import SamplePDF from '../../src/Assets/LCS2019061_Ajay.pdf'

// Pdf Viewer
import { SinglePage } from './../Components/Pdf/singlePage.js' 

// Icons
import { FaCircle, FaCheckCircle } from 'react-icons/fa'

// Lottie Animations 
import LottieAnimations from './../Animations/Leaf_Animation/Leaf_Animation.js'
import  Loading  from './../Animations/Loading.json'


export const ProfilePage = () => {

    useEffect(() => {
        ChangeView()
    }, [])

    // To set Pdf File
    const [pdf, setPdf] = useState(SamplePDF)

    // To Transition between loading and Final State
    const [loading , setLoading] = useState(false)

    // To ensure only one request at a time
    const [wait, setWaiting] = useState(false) 

    // Pdf Progress
    const [progress, setProgress] = useState(0)

    // Pdf Problem
    const [problem, setProblem] = useState("")

    // Pdf Priview
    const ChangeView = async () => {
        setLoading(true)

        try {
            
            // Wait Untill a request is pending
            if (wait) {
                throw new Error("Request is Pending")
            }

            setWaiting(true)

            const res = await fetch('/getData' , {
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            // If Certificate is not found
            const data = await res.json()
            console.log(data)

            if (data.Certificates.length == 0 && !data.Certificates[0].filename){
                throw new Error("Not Found")
            }   

            const filename = data.Certificates[0].filename

            // Progress of the Application approval
            console.log(data.Certificates)
            setProgress(data.Certificates[0].status)

            // Problem Message
            setProblem(data.Certificates[0].message)

            // Get The files from the database
            const res1 = await fetch(`/pdf/${filename}`, {
                method: "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            })  

            // Setting Pdf to render on the Page
            setPdf(res1.url)

            // Set Waiting false
            setWaiting(false)

        } catch (err) {
            if (err != "Request is pending"){
                setPdf(SamplePDF)
            }
        } finally {
            setLoading(false)
        }
    }

    const percent_progress = ["0%", "25%", "50%", "75%", "100%"]

    return (
        <div className = "ProfilePage_Container">
            
            <QuickDashboard></QuickDashboard>
            
            <div className = "Profile_Information">

                <div className = "Profile_Upload_Documents">

                    <h5 className = "Profile_Upload_heading">Upload Documents</h5>

                    <form>
                            
                        <div className = "Profile_Documents">
                            <PdfViewer label = "Jee Mains Result" onclick = {ChangeView}/>
                        </div>
    
                    </form>
                </div>

                <div className = "Profile_Donors_Information">
                    {loading ? (
                        <div className = "Pdf_loader">
                            <LottieAnimations lotti = {Loading} width = "200px"></LottieAnimations>
                            <div>Pdf Is Loading: Please Wait</div>
                        </div>

                    ): (
                        <div className = "Doc_info">                
                            
                            <div className = "Pdf">
                                <SinglePage pdf = {pdf}></SinglePage>
                            </div>

                            <div className = "Pdf_approval">
                                <h5>Track your Application</h5>

                                <div className = "Stages_involved">

                                    <ul>
                                        <li>
                                            {(progress >= 1) ? (
                                                <i className = "Pdf_approved"><FaCheckCircle></FaCheckCircle></i>
                                            ): (
                                                <i className = "Pdf_pending"><FaCircle></FaCircle></i>
                                            )}
                                            <span>File Uploaded</span>
                                        </li>

                                        <li>
                                            {(progress >= 2) ? (
                                                <i className = "Pdf_approved"><FaCheckCircle></FaCheckCircle></i>
                                            ): (
                                                <i className = "Pdf_pending"><FaCircle></FaCircle></i>
                                            )}
                                            <span> Verified by Admin</span>
                                        </li>

                                        <li>
                                            {(progress >= 3) ? (
                                                <i className = "Pdf_approved"><FaCheckCircle></FaCheckCircle></i>
                                            ): (
                                                <i className = "Pdf_pending"><FaCircle></FaCircle></i>
                                            )}
                                            <span> Verified By Hod</span>
                                        </li>

                                        <li>
                                            {(progress >= 4) ? (
                                                <i className = "Pdf_approved"><FaCheckCircle></FaCheckCircle></i>
                                            ): (
                                                <i className = "Pdf_pending"><FaCircle></FaCircle></i>
                                            )}
                                            <span> Approved </span>
                                        </li>
                                    </ul>

                                    <div className = "Problem_Statement">
                                        {(problem) ? (
                                            <span className = "If_Not_Approoved">{problem}</span>
                                        ): (
                                            <span> Your application approval is <span className = "Approoval_percentage">{percent_progress[progress]} </span>completed </span>
                                        )}
                                        
                                    </div>

                                </div>

                            </div>
                        </div>
                    )}
                    
                    <div className = "Status">
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage