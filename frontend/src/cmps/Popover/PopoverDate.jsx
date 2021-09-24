import React, { Component } from 'react'
import { Popover } from './Popover'
// import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


export class PopoverDate extends Component {
    render() {
        const { togglePopover, currentTarget, title } = this.props
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div>
                    hi {title}
                </div>
            </Popover >
        )
    }
}

