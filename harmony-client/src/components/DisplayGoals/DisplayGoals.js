import React from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'

function DisplayGoals({goals,updateGoal}) {
    return (
        <div>
            {goals.map(goal=>{
                return ( <ProgressBar key={goal._id} goal={goal} update={updateGoal}/>)
            })}
        </div>
    )
}

export default DisplayGoals
