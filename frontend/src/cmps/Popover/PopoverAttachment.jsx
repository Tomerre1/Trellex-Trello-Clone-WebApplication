import React, { Component } from 'react'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'
import { cloudinaryService } from '../../services/cloudinary-service'


export class PopoverAttachment extends Component {
    state = {
        webUrlSrc: '',
        webUrlName: '',

    }

    uploadFile = async (ev) => {
        const { currTask, updateTaskDetails } = this.props
        const { attachments } = currTask
        const res = await cloudinaryService.uploadFile(ev)
        const attach = { name: res.original_filename, id: res.asset_id, createdAt: Date.now(), url: res.secure_url }
        currTask.attachments = (attachments) ? [...attachments, attach] : [attach]
        updateTaskDetails(currTask)
    }

    removeAttach = async (attachId) => {
        const { currTask, updateTaskDetails } = this.props
        const { attachments } = currTask
        const attachs = attachments.filter(currAttach => currAttach.id !== attachId)
        currTask.attachments = attachs
        updateTaskDetails(currTask)
    }

    handleChange = (ev) => {
        const { value, name } = ev.target
        this.setState(prevState => ({ ...prevState, [name]: value }))
    }

    onAttachmentClick = () => {
        const { webUrlSrc, webUrlName } = this.state
        const { currTask, updateTaskDetails } = this.props
        const { attachments } = currTask
        if (webUrlSrc) {
            const attach = { name: (webUrlName) ? webUrlName : webUrlSrc, id: utilService.makeId(), createdAt: Date.now(), url: webUrlSrc, isWeb: true }
            currTask.attachments = (attachments) ? [...attachments, attach] : [attach]
            updateTaskDetails(currTask)
        }
    }

    render() {
        const { togglePopover, currentTarget, title } = this.props
        const { webUrlSrc, webUrlName } = this.state
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="attachment-container">
                    <div className="upload-preview" >
                        <label htmlFor="file-upload">Computer</label>
                        <input type="file" onChange={this.uploadFile} accept="img/*" id="file-upload" />
                    </div>
                    <label htmlFor="url-upload">Attach a link</label>
                    <input type="text" id="url-upload" placeholder="Enter link url" value={webUrlSrc} name='webUrlSrc' onChange={this.handleChange} />
                    {webUrlSrc &&
                        <>
                            <label htmlFor="url-name-optional">Link name (optional)</label>
                            <input
                                type="text"
                                id="url-name-optional"
                                name="webUrlName"
                                value={webUrlName}
                                placeholder="Enter link name"
                                onChange={this.handleChange}
                            />
                        </>
                    }
                    <button class="primary-btn" onClick={this.onAttachmentClick}>Attach</button>
                </div>
            </Popover >
        )
    }
}

