import React from 'react'
import './NavBar.scss'
import { Link } from "react-router-dom";


const createLoginLinks = () => {
    return (
    <div className='links'>
            <Link to='/login'> Login </Link>
            <Link to='/signup'> Signup </Link>
    </div>)
}

const createPageLinks = () => {
    return (
        <div className='links'>
            <Link to='/goals'> Goals </Link>
            <Link to='/habits'>  </Link>
        </div>
    )
}

const createWelcomText = (name) => {
    return (
        <div className='welcome'>
            <p> Welcome {name}! todo logout button</p>
        </div>
    )
}

function NavBar ({auth,username}) {   
    return (
        <div className='nav-bar'>
            {auth? createWelcomText(username):createLoginLinks()}
        </div>
    )
}

export default NavBar;
