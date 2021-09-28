import React, { Component } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


export class TaskHeaderDate extends Component {
    state = {
        formatedDate: ''
    }
    componentDidMount = () => {
        const { selectedDate } = this.props
        const formatedDate = this.dueDateFormat(selectedDate)
        this.setState(prevState => ({ ...prevState, formatedDate }))

    }
    onToggleTaskDone = () => {
        this.props.toggleTaskDone()
    }


    dueDateFormat = (dueDate) => {
        const currYear = new Date().getFullYear()
        const dueYear = new Date(dueDate).getFullYear()
        let strDate = ''
        strDate += `${new Date(dueDate).toLocaleString('en-GB', { month: 'numeric' })} `
        strDate += `${new Date(dueDate).toLocaleString('en-GB', { month: 'short' })} at `
        if (dueYear !== currYear) {
            strDate += `${dueYear} `
        }
        strDate += `${new Date(dueDate).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true })}`
        return strDate
    }

    render() {
        const { selectedDate, setCurrentTarget, currTask } = this.props
        const { formatedDate } = this.state
        console.log('formatedDate', formatedDate)
        if (selectedDate.length === 0) return <></>


        return (
            <div className="task-details-header-date item-container flex column">
                <h3 className="task-details-header-title">DUE DATE</h3>
                <div className="date-container flex wrap">
                    {currTask.isDone && <CheckBoxIcon onClick={this.onToggleTaskDone} className="todo-check" />}
                    {!currTask.isDone && <CheckBoxOutlineBlankIcon onClick={this.onToggleTaskDone} />}
                    <button>
                        <span
                            className="date-context"
                            onClick={(event) => { setCurrentTarget(event, 'DATE'); }}>{formatedDate}</span>
                        <span className="drop-down-icon"><ArrowDropDownIcon /></span>
                    </button>
                </div>
            </div>
        )
    }
}


