import React, { Component } from 'react'
import { Popover } from './Popover'
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib

export class PopoverDate extends Component {
    state = {
        date: null
    }

    componentDidMount() {
        const date = this.props.currTask.dueDate ? new Date(this.props.currTask.dueDate) : new Date()
        this.setState(prevState => ({ ...prevState, date }))
    }

    handleChange = (ev) => {
        this.setState({ date: ev })
    }


    onSaveDueDate = (date) => {
        const { currTask, togglePopover } = this.props
        currTask.dueDate = date ? Date.parse(date) : 0;
        //Add activity and add to DB
        togglePopover()
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

