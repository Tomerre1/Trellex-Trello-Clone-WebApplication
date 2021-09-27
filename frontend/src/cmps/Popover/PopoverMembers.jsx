import React, { Component } from 'react'
import { PopoverMemberPreview } from './PopoverMemberPreview'
import { Popover } from './Popover'

export class PopoverMembers extends Component {
    render() {
        const { togglePopover, currentTarget, title, members } = this.props
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="members-popover">
                    <input type="search" placeholder="Search members" />
                    <h4>BOARD MEMBERS</h4>
                    <ul className="clean-list">
                        {members && members.map(member => <PopoverMemberPreview member={member} />)}
                    </ul>
                </div>
            </Popover >
        )
    }
}

