import React, {useState} from 'react'
import './ProgressBar.scss'
import CreateGoal from '../CreateGoal/CreateGoal';

const getWidthPercentage = (a,b) => {
    const percentage = ((a/b)*100).toFixed(0);
    return percentage + '%'
}

const normalizeDates = (start,end) => {
    if (start > end){ return getWidthPercentage(1,1)}

    const totalInterval = end - start;
    const currentInterval = end - Date.now();
    
    return getWidthPercentage((totalInterval-currentInterval),totalInterval);
}

const ProgressBar = (props) => {
    let [isEdit, setEdit] = useState(false);

    if (!props || ! props.goal){ return <></>}
    const {goal,update} = props; 

    const processChange = (evt) => {
        let value = evt.target.value;
        let updatedData = {...goal, currentProgress : value};
        update(updatedData);
    }

    return (
        <div className='progress-bar'>
            <p className='heading'> {goal.name} </p>

            <p className='bar-heading'> Progress {isEdit?<input name='edit' value={goal.currentProgress} onChange={processChange}></input>:`${goal.currentProgress}/${goal.maxProgress}`} </p>
            <div>
            <button className='edit-button' onClick={()=>{setEdit(!isEdit)}}> update</button>
            </div>
            <div className='bar-progress'>
                <div className='progress' 
                    style={{width:getWidthPercentage(goal.currentProgress,goal.maxProgress)}}></div>
            </div>

            <p className='bar-heading'> Time Elapsed {`start: ${new Date(goal.dateStarted).toLocaleDateString()}  end: ${new Date(goal.deadline).toLocaleDateString()}`}</p>
            <div className='bar-time'>
                <div className='progress-time'
                    style={{width:normalizeDates(goal.dateStarted,goal.deadline)}}></div>
            </div>

        </div>
    )
}

export default ProgressBar
