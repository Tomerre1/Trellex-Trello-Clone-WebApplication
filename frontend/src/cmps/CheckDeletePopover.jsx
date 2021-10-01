import React, { Component } from 'react'
import { Popover } from './Popover/Popover'


export class CheckDeletePopover extends Component {
    state = {
    }

    render() {
        const { type, typeTitle, remove, currentTarget, togglePopover } = this.props
        const title = `Delete ${typeTitle}?`
        return (
            <div className="no-back-container">
                <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                    <div className="no-back">
                        <p>Deleting a {type} is permanent and there<br></br>is no way to get it back.</p>
                        <button className="delete-checklist-btn danger-btn" onClick={() => { remove() }}>Delete {type}</button>
                    </div>
                </Popover >
            </div >
        )
    }
}
