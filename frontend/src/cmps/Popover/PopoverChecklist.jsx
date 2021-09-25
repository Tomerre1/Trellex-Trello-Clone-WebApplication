import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'
import { saveBoard, saveTaskDetails } from '../../store/board.actions'
import {  setCurrTaskDetails } from '../../store/app.actions'


export class _PopoverChecklist extends Component {
    state = {
        txt: ''
    }
    handlechange = (ev) => {
        const txt = ev.target.value
        this.setState(prevState => ({ ...prevState, txt }))
    }

    onAddChecklist = (ev) => {
        ev.preventDefault()
        const { board, saveTaskDetails } = this.props
        const { currTask, currGroup } = this.props.currTaskDetails

        if (!currTask.checklist) currTask.checklist = []
        const newList = {
            id: utilService.makeId(),
            title: this.state.txt,
            todos: []
        }
        currTask.checklist.push(newList)
        //Save here to DB
        saveTaskDetails(board, currGroup, currTask)
        setCurrTaskDetails({ currTask, currGroup })
        this.props.togglePopover()
    }

    render() {
        const { togglePopover, currentTarget, title } = this.props
        const { txt } = this.state
        return (
            <div className="checklist-container">
                <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                    <div>
                        <form className="checklist-form" onSubmit={this.onAddChecklist}>
                            <label htmlFor="checklist" className="pop-over-label">Title</label>
                            <input className="checklist-input" id="checklist" type="text" value={txt} onChange={this.handlechange} placeholder="Enter a title..." autoFocus />
                            <button type="submit" className="nch-button add-checklist-btn">Add</button>
                        </form>
                    </div>
                </Popover >
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails
    };
}
const mapDispatchToProps = {
    saveBoard,
    saveTaskDetails,
    setCurrTaskDetails
};

export const PopoverChecklist = connect(mapStateToProps, mapDispatchToProps)(_PopoverChecklist);

