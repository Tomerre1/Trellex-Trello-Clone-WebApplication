import { connect } from 'react-redux'
import React, { Component } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { saveTaskDetails } from '../store/board.actions'
import { setPosition } from '../store/app.actions';

export class _TaskHeaderDate extends Component {
    state = {
        formatedDate: '',
        dueDate: null,
        isTaskDone: false
    }
    componentDidMount = () => {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))

        const dueDate = currTaskDetails.dueDate
        const isTaskDone = currTaskDetails.isDone
        const formatedDate = this.dueDateFormat(currTaskDetails.dueDate)
        this.setState(prevState => ({ ...prevState, formatedDate, dueDate, isTaskDone, currGroup }))
    }

    componentDidUpdate(prevProps) {
        const { dueDate } = this.state
        const { currTaskDetails } = this.props
        if (dueDate !== currTaskDetails.dueDate) {
            const dueDate = currTaskDetails.dueDate
            const formatedDate = this.dueDateFormat(currTaskDetails.dueDate)
            this.setState(prevState => ({ ...prevState, dueDate, formatedDate }))
        }
    }

    onToggleTaskDone = async () => {
        const isTaskDone = !this.state.isTaskDone
        this.setState(prevState => ({ ...prevState, isTaskDone }))

        const { board, saveTaskDetails, currTaskDetails } = this.props
        const { currGroup } = this.state

        currTaskDetails.isDone = !currTaskDetails.isDone;
        await saveTaskDetails(board, currGroup, currTaskDetails)

        // if (isTaskDone) this.props.addActivity('due-date-complete')
        // else this.props.addActivity('due-date-incomplete')
    }

    dueDateFormat = (dueDate) => {
        const currYear = new Date().getFullYear()
        const dueYear = new Date(dueDate).getFullYear()
        let strDate = ''
        strDate += `${new Date(dueDate).toLocaleString('en-GB', { day: 'numeric' })} `
        strDate += `${new Date(dueDate).toLocaleString('en-GB', { month: 'short' })} at `
        if (dueYear !== currYear) {
            strDate += `${dueYear} `
        }
        strDate += `${new Date(dueDate).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true }).toLocaleUpperCase()}`
        return strDate
    }

    getDueStatus = () => {
        const now = Date.now()
        const { currTaskDetails } = this.props
        let dueStatus = '';
        if (currTaskDetails.isDone) dueStatus = 'done';
        else if (now > currTaskDetails.dueDate) dueStatus = 'overdue';
        else {
            const timeDiff = currTaskDetails.dueDate - now;
            if (timeDiff < 86400000) dueStatus = 'due-soon'
        }
        return dueStatus
    }

    get dueMsg() {
        switch (this.getDueStatus()) {
            case 'done': return 'COMPLETE';
            case 'due-soon': return 'DUE SOON';
            case 'overdue': return 'OVERDUE';
            default: return ''
        }
    }

    render() {
        const { currTaskDetails, setPosition } = this.props
        console.log('currTaskDetails',currTaskDetails)
        const { formatedDate, isTaskDone } = this.state
        const dueStatus = this.getDueStatus();
        if (currTaskDetails.dueDate && currTaskDetails.dueDate.length === 0) return <></>

        return (
            <div className="task-details-header-date item-container flex column">
                <h3 className="task-details-header-title">DUE DATE</h3>
                <div className="date-container flex wrap align-center">
                    {isTaskDone && <CheckBoxIcon onClick={this.onToggleTaskDone} className="todo-check pointer" />}
                    {!isTaskDone && <CheckBoxOutlineBlankIcon onClick={this.onToggleTaskDone} className="pointer" />}
                    <button className="secondary-btn date-btn flex align-center">
                        <span
                            className="date-context"
                            onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'LABELS' }) }}>
                            {formatedDate}
                        </span>
                        <span className="drop-down-icon"><ArrowDropDownIcon /></span>
                        <span className={`due-msg ${dueStatus}`}>{this.dueMsg}</span>
                    </button>
                </div>
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
    setPosition,
    saveTaskDetails
};

export const TaskHeaderDate = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TaskHeaderDate);


