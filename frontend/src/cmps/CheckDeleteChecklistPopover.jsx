import React, { Component } from 'react'
import { Popover } from './Popover/Popover'
import { utilService } from '../services/util.service'


export class CheckDeleteChecklistPopover extends Component {
    state = {
    }

    removeChecklist = (checklist) => {
        const { togglePopover , updateTaskDetails ,currTask} = this.props
        const checklistIdx = currTask.checklist.indexOf(checklist)
        currTask.checklist.splice(checklistIdx,1)
        updateTaskDetails(currTask)
        togglePopover()
    }

    render() {
        const { togglePopover, currentTarget,checklist } = this.props
        const title = `Delete ${checklist.title}?`
        return (
            <div className="no-back-container">
                <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                    <div>
                        <p>Deleting a checklist is permanent and there<br></br>is no way to get it back.</p>
                        <button onClick={() => { this.removeChecklist(checklist) }}>Delete checklist</button>
                    </div>
                </Popover >
            </div >
        )
    }
}
