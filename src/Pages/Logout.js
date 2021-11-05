import React, { useEffect, useContext } from 'react'

// History
import { useHistory } from 'react-router-dom' 

// Context
import { UserContext } from './../App.js'

export const Logout = () => {

    const history = useHistory();

    const {state, dispatch} = useContext(UserContext)

    useEffect(() => {
        handleLogout()
    })

    const handleLogout = async () => {

        const res = await fetch('/Signout', {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json"
            },
            credentials : "include"
        })

        console.log(res)
        
        if (res.status === 200) {
            dispatch({type : "USER", payload : false})
            console.log("Logout Successful")
            history.push('/Login')
        } 
        else {
            console.log("Logout Unsuccessful")
        }
    }

    return (
        <>
        </>
    )
}


export default Logout
