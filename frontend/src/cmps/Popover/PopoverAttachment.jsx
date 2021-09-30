import React, { Component } from 'react'
import { Popover } from './Popover'

import { cloudinaryService } from '../../services/cloudinary-service'


export class PopoverAttachment extends Component {

    uploadFile = (ev) => {
        console.log('ev', ev)
        const res = cloudinaryService.uploadFile(ev)
        console.log('res from popover', res)
    }



    render() {
        const { togglePopover, currentTarget, title } = this.props
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="attachment-container">
                    <div className="upload-preview" >
                        <label htmlFor="file-upload">Computer</label>
                        <input type="file" onChange={this.uploadFile} accept="img/*" id="file-upload" />
                    </div>
                </div>
            </Popover >
        )
    }
}

