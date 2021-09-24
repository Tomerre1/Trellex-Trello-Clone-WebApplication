import React, { Component } from 'react'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'


export class PopoverChecklist extends Component {
    state = {
        txt: ''
    }
    handlechange = (ev) => {
        const txt = ev.taget.value
        this.setState(prevState => ({ ...prevState, txt }))
    }

    onAddChecklist = (ev) => {
        console.log('im hereeee')
        ev.preventDefault()
        const { currTask } = this.props
        if (!currTask.checkList) currTask.checkList = []
        const newList = {
            id: utilService.makeId(),
            title: this.state.txt,
            todos: ['dasda', 'dasdas', 'dasdas']
        }
        currTask.checklists.push(newList)
        console.log('######################33')
        // console.log('currTask', currTask)
        console.log('currTask.checklists', currTask.checklists)
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

