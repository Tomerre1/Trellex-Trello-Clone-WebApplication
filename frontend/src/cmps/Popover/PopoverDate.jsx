import React, { Component } from 'react'
import { Popover } from './Popover'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



export class PopoverDate extends Component {
    state = {
        date: null
    }

    componentDidMount() {
        const { currTask } = this.props
        const date = currTask.dueDate ? new Date(currTask.dueDate) : new Date()
        this.setState(prevState => ({ ...prevState, date }))
    }

    handleChange = (ev) => {
        this.setState({ date: ev })
    }

    onSaveDueDate = (date) => {
        const { togglePopover, updateTaskDetails, currTask, setSelectedDate, addActivity } = this.props
        currTask.dueDate = date ? Date.parse(date) : null;
        updateTaskDetails(currTask)
        setSelectedDate(currTask.dueDate)
        togglePopover()
        addActivity('set-date', this.dueDateFormat(currTask.dueDate))
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

    onRemoveDate = () => {
        this.onSaveDueDate(null)
    }

    render() {
        const { togglePopover, currentTarget, title } = this.props
        const { date } = this.state
        return (
            <div className="date-picker-container">
                <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                autoOk
                                variant="static"
                                value={date}
                                openTo="date"
                                onChange={this.handleChange} />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="btn-container flex column">
                        <button className="primary-btn" onClick={() => this.onSaveDueDate(date)} >Save</button>
                        <button className="secondary-btn" onClick={this.onRemoveDate}>Remove</button>
                    </div>
                </Popover >
            </div>
        )
    }
}

