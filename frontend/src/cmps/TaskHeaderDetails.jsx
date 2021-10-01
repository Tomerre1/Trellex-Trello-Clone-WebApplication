import React, { Component } from 'react'
import { TaskHeaderLabels } from './TaskHeaderLabels'
import { TaskHeaderMembers } from './TaskHeaderMembers'
import { TaskHeaderDate } from './TaskHeaderDate'

export class TaskHeaderDetails extends Component {
    state = {
        selectedMembers: null,
        selectedLabels: null,
        selectedDate: null,
    }

    componentDidMount() {
        const { selectedLabels, selectedMembers, selectedDate } = this.props
        this.setState(prevState => ({ ...prevState, selectedLabels, selectedMembers, selectedDate }))
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedLabels, selectedMembers, selectedDate } = this.props
        if (prevProps.selectedLabels !== selectedLabels) {
            this.setState(prevState => ({ ...prevState, selectedLabels }))
        }
        if (prevProps.selectedMembers !== selectedMembers) {
            this.setState(prevState => ({ ...prevState, selectedMembers }))
        }
        if (prevProps.selectedDate !== selectedDate) {
            this.setState(prevState => ({ ...prevState, selectedDate }))
        }
    }

    render() {
        const { selectedLabels, selectedMembers, selectedDate } = this.state
        const { setCurrentTarget, toggleTaskDone, currTask, updateTaskDetails, addActivity } = this.props

        return (
            <div className="task-details-header flex">
                {selectedMembers && <TaskHeaderMembers members={selectedMembers} setCurrentTarget={setCurrentTarget} />}
                {selectedLabels && <TaskHeaderLabels selectedLabels={selectedLabels} setCurrentTarget={setCurrentTarget} />}
                {selectedDate && <TaskHeaderDate selectedDate={selectedDate} setCurrentTarget={setCurrentTarget} toggleTaskDone={toggleTaskDone} currTask={currTask} updateTaskDetails={updateTaskDetails} addActivity={addActivity}/>}
            </div>
        )
    }
}
