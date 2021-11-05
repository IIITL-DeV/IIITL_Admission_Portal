import  React, { createContext, useReducer, useEffect, useState }  from 'react'

// Components
import  Navbar  from './Components/Navbar.js'

// SCSS
import './SCSS/Default.scss'

// Router
import { Route } from 'react-router'

// Pages
import { HomePage } from './Pages/Homepage.js'
import { Login } from './Pages/Login.js'
import { ProfilePage } from './Pages/ProfilePage.js'
import { Logout } from './Pages/Logout.js'
import { Verifier } from './Pages/Verifir.js'
import { GeneralInfo } from './Pages/General_Info.js'
import { ChoicePage } from './Pages/ChoicePage.js'
import { LoginAsFaculty } from './Pages/LoginAsFaculty.js'

// Toggle State Between login and Logout
import { reducer } from  './Reducer/useReducer.js'


// Context Api
export const UserContext = createContext();

export const App = () => {

  useEffect(() => {
    handleLogin()
  }, [])

  const [initialState, setInitialState] = useState(true)

  const handleLogin = async () => {

    try {
      const res = await fetch('/getData', {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        }, 
        credentials : "include"
      })

      console.log(res.status)
      if (res.status == 401) {
        setInitialState(!initialState)
        throw new Error("Login First")
      }

    } catch (err) {
      console.log(err)
      setInitialState(!initialState)
    }
    finally {
      console.log(initialState)
    }
  }

  // UseReducer
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className = "App">
      <UserContext.Provider value = {{state, dispatch}}>
    
        <Navbar/>

        <Route exact path = '/' component = { HomePage }></Route>

        <Route exact path = '/Login' component = { Login }></Route>

        <Route exact path = '/Dashboard' component = { ProfilePage }></Route>

        <Route exact path = '/Logout' component = { Logout }></Route>

        <Route exact path = '/Verifier' component = { Verifier }></Route>

        <Route exact path = '/GeneralInfo' component = { GeneralInfo }></Route>

        <Route exact path = '/ChoicePage' component = { ChoicePage }></Route>

        <Route exact path = '/LoginFaculty' compnent = { LoginAsFaculty }></Route>

      </UserContext.Provider>
    </div>
  );
}

export default App;
