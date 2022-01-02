import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Default from '../Default/Default';
import NavBar from '../../components/NavBar/NavBar';
import Goals from '../Goals/Goals'
import {getUserInfo} from '../../utils/apiRequests';


export default class Base extends Component {

    state = {}

    componentDidMount() {
        this.attemptLogin();
    }

    attemptLogin = async () => {
        const loginInfo = await getUserInfo();
        this.setState({auth:loginInfo.status,...loginInfo.data})
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <NavBar auth={!!this.state.auth} username={this.state.username}/>
                    <Routes>
                        <Route path="/login" element={<Login onsuccess={this.attemptLogin}/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/goals" element={<Goals/>}/>
                        <Route path="/habits" element={<>habit</>}/>
                        <Route path="*" element={<Default/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
