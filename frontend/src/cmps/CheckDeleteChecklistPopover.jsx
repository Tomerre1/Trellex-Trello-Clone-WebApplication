import React, { Component } from 'react'
import { Popover } from './Popover/Popover'


export class CheckDeleteChecklistPopover extends Component {
    state = {
    }

    removeChecklist = (checklist) => {
        const { togglePopover , updateTaskDetails ,currTask, addActivity} = this.props
        const checklistIdx = currTask.checklists.indexOf(checklist)
        currTask.checklists.splice(checklistIdx,1)
        updateTaskDetails(currTask)
        togglePopover()
        addActivity('remove-checklist')
    }

    render() {
        const { togglePopover, currentTarget,checklist } = this.props
        const title = `Delete ${checklist.title}?`
        return (
            <div className="no-back-container">
                <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                    <div className="no-back">
                        <p>Deleting a checklist is permanent and there<br></br>is no way to get it back.</p>
                        <button className="delete-checklist-btn danger-btn" onClick={() => { this.removeChecklist(checklist) }}>Delete checklist</button>
                    </div>
                </Popover >
            </div >
        )
    }
}
