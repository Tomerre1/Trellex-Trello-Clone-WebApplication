import React, { Component } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


export class TaskHeaderDate extends Component {
    state = {
        formatedDate: '',
        dueDate: null,
        isTaskDone: false
    }
    componentDidMount = () => {
        const { selectedDate, currTask } = this.props
        const dueDate = selectedDate
        const isTaskDone = currTask.isDone
        const formatedDate = this.dueDateFormat(selectedDate)
        this.setState(prevState => ({ ...prevState, formatedDate, dueDate, isTaskDone }))
    }

    componentDidUpdate(prevProps) {
        const { dueDate } = this.state
        const { selectedDate } = this.props
        if (dueDate !== selectedDate) {
            const dueDate = selectedDate
            const formatedDate = this.dueDateFormat(selectedDate)
            this.setState(prevState => ({ ...prevState, dueDate, formatedDate }))
        }
    }

    onToggleTaskDone = () => {
        const isTaskDone = !this.state.isTaskDone
        this.setState(prevState => ({ ...prevState, isTaskDone }))
        this.props.toggleTaskDone()

         //For Activity
         if(isTaskDone) this.props.addActivity('due-date-complete')
         else this.props.addActivity('due-date-incomplete')
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
        const { currTask } = this.props
        let dueStatus = '';
        if (currTask.isDone) dueStatus = 'done';
        else if (now > currTask.dueDate) dueStatus = 'overdue';
        else {
            const timeDiff = currTask.dueDate - now;
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
        const { selectedDate, setCurrentTarget, currTask } = this.props
        const { formatedDate, isTaskDone } = this.state
        const dueStatus = this.getDueStatus();
        // console.log('currTask.isDone from TaskHeaderDate',currTask.isDone)
        if (selectedDate.length === 0) return <></>

        return (
            <div className="task-details-header-date item-container flex column">
                <h3 className="task-details-header-title">DUE DATE</h3>
                <div className="date-container flex wrap align-center">
                    {isTaskDone && <CheckBoxIcon onClick={this.onToggleTaskDone} className="todo-check pointer" />}
                    {!isTaskDone && <CheckBoxOutlineBlankIcon onClick={this.onToggleTaskDone} className="pointer" />}
                    <button className="secondary-btn date-btn flex align-center">
                        <span
                            className="date-context"
                            onClick={(event) => { setCurrentTarget(event, 'DATE'); }}>{formatedDate}</span>
                        <span className="drop-down-icon"><ArrowDropDownIcon /></span>
                        <span className={`due-msg ${dueStatus}`}>{this.dueMsg}</span>
                    </button>
                </div>
            </div>
        )
    }
}


