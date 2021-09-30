import React, { Component } from 'react'
import { Popover } from './Popover'

import { cloudinaryService } from '../../services/cloudinary-service'


export class PopoverAttachment extends Component {

    uploadFile = async (ev) => {
        const { currTask, updateTaskDetails } = this.props
        const { attachments } = currTask
        const res = await cloudinaryService.uploadFile(ev)
        const attach = { name: res.original_filename, id: res.asset_id, createdAt: Date.now(), url: res.secure_url }
        currTask.attachments = (attachments) ? [...attachments, attach] : [attach]
        await updateTaskDetails(currTask)
    }
    removeFile = async (attach) => {
        const { currTask, updateTaskDetails } = this.props
        const { attachments } = currTask
        const attachs = attachments.filter(currAttach => currAttach.id !== attach.id)
        currTask.attachments = attachs
        await updateTaskDetails(currTask)
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
                    <label htmlFor="url-upload">Enter url</label>
                    <input type="text" id="url-upload" placeholder="Enter URL" />
                </div>
            </Popover >
        )
    }
}

