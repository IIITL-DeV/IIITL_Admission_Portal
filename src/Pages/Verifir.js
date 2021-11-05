import React, { useEffect, useState } from 'react'

// Components
import { StudentsCard } from './../Components/StudentsCard'

// SCSS
import './../SCSS/Verifier.scss'

export const Verifier = () => {

    // List of Users
    const [data, setData] = useState([])
    
    useEffect(() => {
        UploadStudents()
    }, [])

    
    const UploadStudents = async () => {
        
        // Fetching Student Details From the Database
        try {   
            const res = await fetch('/userVerifier', {
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                }
            })

            const user = await res.json()
            console.log(user)
            setData(user)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className = "Verifier_Container">
            <div className = "Verifier_stats">
                
            </div>

            
            <div className = "Verifier_List">
                {data.map(user => {
                    return (
                        <div>
                            <StudentsCard users = {user}></StudentsCard>
                        </div>
                    )})}
            </div>

        </div>
    )
}

export default Verifier