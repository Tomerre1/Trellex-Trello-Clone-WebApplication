import React, { Component } from 'react'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service'


export class PopoverChecklist extends Component {
    state = {
        txt: ''
    }
    handlechange = (ev) => {
        const txt = ev.target.value
        this.setState(prevState => ({ ...prevState, txt }))
    }

    onAddChecklist = (ev) => {
        ev.preventDefault()
        const { togglePopover, updateTaskDetails, currTask, board, updateBoard } = this.props

        if (!currTask.checklists) currTask.checklists = []
        const newList = {
            id: utilService.makeId(),
            title: this.state.txt,
            todos: []
        }
        currTask.checklists.push(newList)
        updateTaskDetails(currTask)
        togglePopover()
        this.props.addActivity('add-checklist')
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
