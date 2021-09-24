import React, { Component } from 'react'
import { Popover } from './Popover'

export class PopoverChecklist extends Component {
    state = {
        txt: ''
    }
    handlechange = (ev) => {
        const txt = ev.taget.value
        this.setState(prevState => ({ ...prevState, txt }))
    }

    addChecklist = (ev) => {
        ev.preventDefault()
        this.props.togglePopover()
    }

    render() {
        const { togglePopover, currentTarget, title, checkList } = this.props
        const { txt } = this.state
        console.log('checkList', checkList)
        return (
            <div className="checklist-container">
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div>
                    <form className="checklist-form" onSubmit={this.addChecklist}>
                        <label htmlFor="checklist" className="pop-over-label">Title</label>
                        <input className="checklist-input" id="checklist" type="text" value={txt} onChange={this.handlechange} placeholder="Enter a title..." autoFocus />
                        <button className="nch-button add-checklist-btn primary-btn wide-btn">Add</button>
                    </form>
                </div>
            </Popover >
            </div>
        )
    }
}

