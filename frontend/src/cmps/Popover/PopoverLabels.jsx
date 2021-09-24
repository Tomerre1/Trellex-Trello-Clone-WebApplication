import React, { Component } from 'react'
import { Popover } from './Popover'

export class PopoverLabels extends Component {
    render() {
        const { togglePopover, currentTarget, labels, title } = this.props
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div>
                    hi {title}
                </div>
            </Popover >
        )
    }
}

