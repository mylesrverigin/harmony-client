import React from 'react'
import './ProgressBar.scss'

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
    if (!props || ! props.goal){ return <></>}
    const {goal} = props; 

    return (
        <div className='progress-bar'>
            <p className='heading'> {goal.name} </p>

            <p className='bar-heading'> Progress {`${goal.currentProgress}/${goal.maxProgress}`}</p>
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
