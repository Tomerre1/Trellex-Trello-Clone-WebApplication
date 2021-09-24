import React, { Component } from 'react'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'


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
        const { currTask } = this.props
        if (!currTask.checkList) currTask.checkList = []
        const newList = {
            id: utilService.makeId(),
            title: this.state.txt,
            todos: []
        }
        currTask.checklist.push(newList)
        //Save here to DB
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

