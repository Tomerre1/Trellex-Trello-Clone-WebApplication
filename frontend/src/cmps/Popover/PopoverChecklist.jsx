import { connect } from "react-redux";
import React, { Component } from 'react'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'
import { saveBoard, saveTaskDetails } from '../../store/board.actions'
import { tooglePopover } from '../../store/app.actions'

export class _PopoverChecklist extends Component {
    state = {
        txt: ''
    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        this.setState(prevState => ({ ...prevState, currGroup }))
    }

    handlechange = (ev) => {
        const txt = ev.target.value
        this.setState(prevState => ({ ...prevState, txt }))
    }

    onAddChecklist = (ev) => {
        ev.preventDefault()
        // const {  saveTaskDetails, currTaskDetails, addActivity } = this.props
        const {  saveTaskDetails, currTaskDetails, tooglePopover } = this.props

        if (!currTaskDetails.checklists) currTaskDetails.checklists = []
        const newList = {
            id: utilService.makeId(),
            title: this.state.txt,
            todos: []
        }
        currTaskDetails.checklists.push(newList)
        saveTaskDetails(currTaskDetails)
        tooglePopover()
        // addActivity('add-checklist')
    }

    render() {
        const { title } = this.props
        const { txt } = this.state
        return (
            <div className="checklist-container">
                <Popover title={title} >
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
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
    };
}
const mapDispatchToProps = {
    saveTaskDetails,
    saveBoard,
    tooglePopover
};

export const PopoverChecklist = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PopoverChecklist);
