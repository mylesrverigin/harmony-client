import React from 'react'
import './Signup.scss';
import {parseInputs} from '../../utils/collectFormData'
import {signupUser} from '../../utils/apiRequests';

const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const formData = parseInputs('signup-input');
    if (validatePasswords(formData)) {
        handleSignup(formData);
    }else {
        // error handle bad passwords
        console.log('bad password')
    }

}

const handleSignup = async (data) => {
    const response = await signupUser(data);
    console.log(response);
    //TODO handle login success
}

const validatePasswords = (data) => {
    return data.password === data.passwordMatch
}

function Signup() {
    return (
        <div className='signup'>
            <form className='form' onSubmit={handleFormSubmit}>
                <input placeholder='username' className='signup-input' name='username'></input>
                <input placeholder='email' className='signup-input' name='email'></input>
                <input placeholder='password' type='password' className='signup-input' name='password'></input>
                <input placeholder='password retype' type='password' className='signup-input' name='passwordMatch'></input>
                <button className='button'> Signup</button>
            </form>
        </div>
    )
}

export default Signup
