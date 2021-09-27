import React, { Component } from 'react'
import { TaskHeaderLabels } from './TaskHeaderLabels'
import { TaskHeaderMembers } from './TaskHeaderMembers'

export class TaskHeaderDetails extends Component {
    state = {
        selectedMembers: null,
        selectedLabels: null,
        selectedDate: null,
    }

    componentDidMount() {
        const { selectedLabels, selectedMembers } = this.props
        this.setState(prevState => ({ ...prevState, selectedLabels, selectedMembers }))
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedLabels, selectedMembers, selectedDate } = this.props
        if (prevProps.selectedLabels !== selectedLabels) {
            this.setState(prevState => ({ ...prevState, selectedLabels }))
        }
        if (prevProps.selectedMembers !== selectedMembers) {
            this.setState(prevState => ({ ...prevState, selectedMembers }))
        }
        // if (prevProps.selectedDate !== selectedDate) {
        //     this.setState(prevState => ({ ...prevState, selectedDate }))
        // }
    }

    render() {
        const { selectedLabels, selectedMembers, selectedDate, } = this.state

        return (
            <div className="task-details-header flex">
                {selectedMembers && <TaskHeaderMembers members={selectedMembers} />}
                {selectedLabels && <TaskHeaderLabels selectedLabels={selectedLabels} />}
            </div>
        )
    }
}
