import React, {useState} from 'react'
import './Login.scss'
import {parseInputs} from '../../utils/collectFormData'
import {loginUser} from '../../utils/apiRequests';


const renderForm = (submitFunction) => {
    return (
        <form className='form' onSubmit={submitFunction}>
            <input placeholder='email' className='login-input' name='email'></input>
            <input placeholder='password' type='password' className='login-input' name='password'></input>
            <button className='button'> Login</button>
        </form>
    )
}


function Login({onsuccess}) {
    const [showTextBool,setShow] = useState(false);
    const [showTextValue,setShowText] = useState('');

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        const formData = parseInputs('login-input');
        handleLogin(formData)
    }
    
    const handleLogin = async (data) => {
        const response = await loginUser(data);
        if (!response.status) {
            // error on login
            setShow(true);
            setShowText(response.error);
        }else {
            // successful login
            setShow(response.data.status);
            setShowText('Authentication successful')
            onsuccess();
        }
    }

    return (
        <div className='login'>
            {showTextBool? showTextValue:''}
            {renderForm(handleFormSubmit)}
        </div>
    )
}

export default Login
