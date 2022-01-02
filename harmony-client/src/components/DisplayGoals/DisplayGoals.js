import React from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'

function DisplayGoals({goals}) {
    console.log(goals)
    return (
        <div>
            {goals.map(goal=>{
                return ( <ProgressBar key={goal._id} goal={goal}/>)
            })}
        </div>
    )
}

export default DisplayGoals
