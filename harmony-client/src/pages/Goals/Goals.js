import React, { Component } from 'react'
import CreateGoal from '../../components/CreateGoal/CreateGoal'
import DisplayGoals from '../../components/DisplayGoals/DisplayGoals';
import { getGoal } from '../../utils/apiRequests';

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

    render() {
        let {error, errorText,goals} = this.state
        return (
            <div>
                <DisplayGoals goals={goals}/>
                {error? errorText:''}
                <CreateGoal/>
            </div>
        )
    }
}
