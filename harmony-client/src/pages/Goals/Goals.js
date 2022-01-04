import React, { Component } from 'react'
import CreateGoal from '../../components/CreateGoal/CreateGoal'
import DisplayGoals from '../../components/DisplayGoals/DisplayGoals';
import { getGoal,updateGoal } from '../../utils/apiRequests';

export default class Goals extends Component {

    state = {
        error : false,
        errorText : '',
        goals: []
    }

    getUserGoals = async () => {
        const goals = await getGoal();
        if (!goals.status) {
            this.setState({error : true, errorText : goals.error})
        } else {
            this.setState({goals : goals.data})
        }
    }

    componentDidMount() {
        this.getUserGoals();
    }

    updateGoal = (update) => {
        if (!update || !update._id){ return }

        let searchId = update._id;
        
        for (let i=0;i <this.state.goals.length;i++) {
            if (searchId === this.state.goals[i]._id){
                //found goal 
                let updatedArr = this.state.goals
                updatedArr[i] = update;
                this.apiUpdateGoal(update);
                this.setState({goals:updatedArr})
                break;
            }
        }

    }

    apiUpdateGoal = async (update) => {
        const response = await updateGoal(update);
        console.log(response);
    }

    render() {
        let {error, errorText,goals} = this.state
        return (
            <div>
                <DisplayGoals goals={goals} updateGoal={this.updateGoal}/>
                {error? errorText:''}
                <CreateGoal oncreate={this.getUserGoals}/>
            </div>
        )
    }
}
