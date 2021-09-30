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
        console.log('%c  prevProps:', 'color: #00000;background: #aaefe5;', prevProps);
        console.log('%c  selectedLabels:', 'color: #00000;background: #aaefe5;', selectedLabels);

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
        const { setCurrentTarget, toggleTaskDone, currTask, updateTaskDetails } = this.props

        return (
            <div className="task-details-header flex">
                {selectedMembers && <TaskHeaderMembers members={selectedMembers} setCurrentTarget={setCurrentTarget} />}
                {selectedLabels && <TaskHeaderLabels selectedLabels={selectedLabels} setCurrentTarget={setCurrentTarget} />}
                {selectedDate && <TaskHeaderDate selectedDate={selectedDate} setCurrentTarget={setCurrentTarget} toggleTaskDone={toggleTaskDone} currTask={currTask} updateTaskDetails={updateTaskDetails} />}
            </div>
        )
    }
}
