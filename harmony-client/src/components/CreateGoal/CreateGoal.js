import React, {useState} from 'react'
import './CreateGoal.scss'
import {parseInputs,parseCheckbox} from '../../utils/collectFormData';
import {createGoal} from '../../utils/apiRequests';


let globalSetError;
let globalSetErrorText;

const extractFormData = () => {
    return {...parseInputs('goal-input'), ...parseCheckbox('goal-checkbox')}
}

const handleSubmit = async (evt) => {
    evt.preventDefault();
    let formData = extractFormData();
    formData['deadline'] = parseDates(formData.deadline)
    if (formData['dateStarted'] !== '') {
        formData['dateStarted'] = parseDates(formData.dateStarted)
    }
    const response = await createGoal(formData);
    if (!response.status) {
        globalSetError(true);
        globalSetErrorText(response.error);
    }else {
        globalSetError(true);
        globalSetErrorText('goal created');
    }
}

const parseDates = (dateString) => {
    // expect input dd/mm/yyyy
    try {
        let splitDate = dateString.split('/').reverse();
        let newDate = splitDate.join('-')
        return new Date(newDate).getTime();
    } catch (e) {
        console.log(e);
    }
}

const createForm = (onSubmit) => {
    return (<form className='form' onSubmit={onSubmit}>
        <input placeholder='name' className='goal-input' name='name'></input>
        <input placeholder='details' className='goal-input' name='details'></input>
        <input placeholder='start date dd/mm/yyyy' className='goal-input' name='dateStarted'></input>
        <input placeholder='deadline dd/mm/yyyy' className='goal-input' name='deadline'></input>
        <input placeholder='current progress' className='goal-input' name='currentProgress' type='number'></input>
        <input placeholder='max progress' className='goal-input' name='maxProgress' type='number'></input>
        
        <label htmlFor='important'> important </label>
        <input placeholder='important' className='goal-checkbox' name='important' type='checkbox'></input>
        <label htmlFor='urgent'> urgent </label>
        <input placeholder='urgent' className='goal-checkbox' name='urgent' type='checkbox'></input>

        <textarea placeholder='reasons to complete this goal' className='goal-input' name='insentive'></textarea>
        
        <button className='button'> Create Goal </button>
    </form>)
}

function CreateGoal() {
    const [isError,setIsError] = useState(false);
    const [errorText,setErrorText] = useState('');

    globalSetError = setIsError;
    globalSetErrorText = setErrorText;

    return (
        <div className='create-goal'>
            {isError? errorText : ''}
            {createForm(handleSubmit)}
        </div>
    )
}

export default CreateGoal
