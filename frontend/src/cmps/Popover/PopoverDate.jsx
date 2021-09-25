import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover } from './Popover'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { saveBoard, saveTaskDetails } from '../../store/board.actions'
import {  setCurrTaskDetails } from '../../store/app.actions'


export class _PopoverDate extends Component {
    state = {
        date: null
    }

    componentDidMount() {
        const { currTask } = this.props.currTaskDetails
        const date = currTask.dueDate ? new Date(currTask.dueDate) : new Date()
        this.setState(prevState => ({ ...prevState, date }))
    }

    handleChange = (ev) => {
        this.setState({ date: ev })
    }

    onSaveDueDate = (date) => {
        const { togglePopover , board, saveTaskDetails } = this.props
        const { currTask, currGroup } = this.props.currTaskDetails

        currTask.dueDate = date ? Date.parse(date) : 0;
        //Add activity and add to DB
        saveTaskDetails(board, currGroup, currTask)
        togglePopover()
    }
    // onSaveDueDate = (date) => {
    //     const { currTask, togglePopover } = this.props
    //     currTask.dueDate = date ? Date.parse(date) : 0;
    //     //Add activity and add to DB
    //     // saveTaskDetails(board, currGroup, currTask)
    //     togglePopover()
    // }

    onRemoveDate = () => {
        this.onSaveDueDate(null)
    }


    render() {
        const { togglePopover, currentTarget, title } = this.props
        const { date } = this.state
        // const { board, currTaskDetails } = this.props
        // console.log('########board#####', board)
        // console.log('#########currTaskDetails#######', currTaskDetails)
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

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        currTaskDetails: state.appModule.currTaskDetails
    };
}
const mapDispatchToProps = {
    saveBoard,
    saveTaskDetails,
    setCurrTaskDetails
};

export const PopoverDate = connect(mapStateToProps, mapDispatchToProps)(_PopoverDate);

