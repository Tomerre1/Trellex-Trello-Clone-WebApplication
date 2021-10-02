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

    // componentDidUpdate(prevProps, prevState) {
    //     const { selectedLabels, selectedMembers, selectedDate } = this.props
    //     if (prevProps.selectedLabels !== selectedLabels) {
    //         this.setState(prevState => ({ ...prevState, selectedLabels }))
    //     }
    //     if (prevProps.selectedMembers !== selectedMembers) {
    //         this.setState(prevState => ({ ...prevState, selectedMembers }))
    //     }
    //     if (prevProps.selectedDate !== selectedDate) {
    //         this.setState(prevState => ({ ...prevState, selectedDate }))
    //     }
    // }

    render() {
        const { selectedDate } = this.state
        const { setCurrentTarget, toggleTaskDone, currTaskDetails, board, updateTaskDetails, addActivity } = this.props


        return (
            <div className="task-details-header flex">
                <TaskHeaderMembers />
                <TaskHeaderLabels />
                {selectedDate && <TaskHeaderDate selectedDate={selectedDate} setCurrentTarget={setCurrentTarget} toggleTaskDone={toggleTaskDone} currTaskDetails={currTaskDetails} updateTaskDetails={updateTaskDetails} addActivity={addActivity} />}
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
const mapDispatchToProps = {

};

export const TaskHeaderDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TaskHeaderDetails);
