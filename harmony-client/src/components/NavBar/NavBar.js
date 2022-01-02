import React, { Component } from 'react'
import './NavBar.scss'
import { Link } from "react-router-dom";
import {getUserInfo} from '../../utils/apiRequests';


export default class NavBar extends Component {
    state = {auth : false}

    componentDidMount(){
        this.attemptLogin();
    }

    attemptLogin = async () => {
        const loginInfo = await getUserInfo();
        console.log(loginInfo)
        this.setState({auth:loginInfo.status, ...loginInfo.data})
    }

    createLoginLinks = () => {
        return (
        <div className='links'>
                <Link to='/login'> Login </Link>
                <Link to='/signup'> Signup </Link>
        </div>)
    }

    createWelcomText = () => {
        return (
            <div className='welcome'>
                <p> Welcome {this.state.username}! todo logout button</p>
            </div>
        )
    }

    render() {
        const {auth} = this.state
        
        return (
            <div className='nav-bar'>
                {auth? this.createWelcomText():this.createLoginLinks()}
            </div>
        )
    }

}
