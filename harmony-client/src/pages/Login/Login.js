import React from 'react'
import './Login.scss'
import {parseInputs} from '../../utils/collectFormData'
import {loginUser} from '../../utils/apiRequests';

const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const formData = parseInputs('login-input');
    handleLogin(formData)
}

const handleLogin = async (data) => {
    const response = await loginUser(data);
    //TODO handle login success
}

function Login() {
    return (
        <div className='login'>
            <form className='form' onSubmit={handleFormSubmit}>
                <input placeholder='email' className='login-input' name='email'></input>
                <input placeholder='password' type='password' className='login-input' name='password'></input>
                <button className='button'> Login</button>
            </form>
        </div>
    )
}

export default Login
