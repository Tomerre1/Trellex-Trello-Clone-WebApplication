import { connect } from "react-redux";
import React, { Component } from 'react'
import { Popover } from './Popover'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { saveBoard, saveTaskDetails, addActivity } from '../../store/board.actions'
import { togglePopover, setCurrTaskDetails } from '../../store/app.actions'


export class _PopoverDate extends Component {
    state = {
        date: null
    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        const date = currTaskDetails.dueDate ? new Date(currTaskDetails.dueDate) : new Date()
        this.setState(prevState => ({ ...prevState, date, currGroup }))
    }

    handleChange = (ev) => {
        this.setState({ date: ev })
    }

    onSaveDueDate = async (date) => {
        const { board, togglePopover, saveTaskDetails, currTaskDetails, addActivity, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        currTaskDetails.dueDate = date ? Date.parse(date) : null;
        togglePopover()
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
        if (date) addActivity(board, currTaskDetails, 'set-date', this.dueDateFormat(currTaskDetails.dueDate))
        else addActivity(board, currTaskDetails, 'remove-date')
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
        const { title } = this.props
        const { date } = this.state
        return (
            <div className="date-picker-container">
                <Popover title={title} >
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                autoOk
                                variant="static"
                                value={date}
                                openTo="date"
                                color='white'
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

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
    };
}
const mapDispatchToProps = {
    saveTaskDetails,
    saveBoard,
    togglePopover,
    addActivity,
    setCurrTaskDetails
};

export const PopoverDate = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PopoverDate);

