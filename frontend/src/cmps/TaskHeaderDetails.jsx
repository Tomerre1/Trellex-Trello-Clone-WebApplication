import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TaskHeaderLabels } from './TaskHeaderLabels'
import { TaskHeaderMembers } from './TaskHeaderMembers'
import { TaskHeaderDate } from './TaskHeaderDate'

export class _TaskHeaderDetails extends Component {
    state = {
        selectedMembers: null,
        selectedLabels: null,
        selectedDate: null,
    }

    componentDidMount() {
        const { selectedDate, } = this.props
        this.setState(prevState => ({
            ...prevState,
            selectedDate
        }))
    }

    render() {
        const { selectedDate } = this.state
        const { setCurrentTarget, toggleTaskDone, currTaskDetails, board, updateTaskDetails, addActivity } = this.props


        return (
            <div className="task-details-header flex">
                <TaskHeaderMembers />
                <TaskHeaderLabels />
                <TaskHeaderDate />
                {/* {selectedDate && <TaskHeaderDate selectedDate={selectedDate} setCurrentTarget={setCurrentTarget} toggleTaskDone={toggleTaskDone} currTaskDetails={currTaskDetails} updateTaskDetails={updateTaskDetails} addActivity={addActivity} />} */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
    };
}

export const TaskHeaderDetails = connect(
    mapStateToProps,
    null
)(_TaskHeaderDetails);
