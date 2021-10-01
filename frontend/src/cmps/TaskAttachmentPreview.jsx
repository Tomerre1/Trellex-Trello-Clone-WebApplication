import React, { Component } from 'react';
import { utilService } from '../services/util.service';
import VideoLabel from '@mui/icons-material/VideoLabel';
import { CheckDeletePopover } from './CheckDeletePopover'
import { EditAttachmentPopover } from './EditAttachmentPopover'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Link } from 'react-router-dom';


export class TaskAttachmentPreview extends Component {


    state = {
        isPopover: false,
        isEditPopover: false,
        currentTarget: null
    }

    togglePopover = () => {
        this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
    }
    toggleEditPopover = () => {
        this.setState(prevState => ({ ...prevState, isPopover: false, isEditPopover: !prevState.isEditPopover }))
    }

    setCurrentTarget = (event) => {
        this.setState(prevState => ({ ...prevState, currentTarget: event }))
        // this.togglePopover()
    };

    removeAttach = () => {
        const { updateTaskDetails, currTask, addActivity, attachment } = this.props
        const attachs = currTask.attachments.filter(currAttach => currAttach.id !== attachment.id)
        currTask.attachments = attachs
        updateTaskDetails(currTask)
        this.togglePopover()
        addActivity('remove-attachment', attachment.name)
    }

    onRemoveAttach = (ev) => {
        this.setCurrentTarget(ev)
        this.togglePopover()

    }
    onEditAttach = (ev) => {
        this.setCurrentTarget(ev)
        this.toggleEditPopover()
    }

    updateAttachment = () => {
        console.log('update attach')
    }


    render() {
        const { attachment, currTask, updateTaskDetails, addActivity } = this.props

        const { isPopover, currentTarget, isEditPopover } = this.state

        console.log('attachment', attachment)
        console.log('currTask', currTask)
        const { isWeb } = attachment
        return (
            <div className="attachment-preview flex">
                {(isWeb) ?
                    <Link className="attachment-thumbnail flex" to={{ pathname: `https://${attachment.url}` }} target="_blank" title={`${attachment.name}`} style={{ backgroundImage: (`${attachment.url}`) }} rel="noreferrer nofollow noopener">
                        <AttachFileIcon />
                    </Link> :
                    <img src={attachment.url} alt={attachment.name} />
                }
                <div className="attachment-content">
                    <div className="attachment-details">
                        <span className="attachment-title">{attachment.name}</span>
                        <div className="attachment-actions">
                            <span className="attachment-date">Added {utilService.timeSince(attachment.createdAt)}</span>
                            <button onClick={(event) => { this.onRemoveAttach(event) }}>Delete</button>
                            <button onClick={(event) => { this.onEditAttach(event) }}>Edit</button>
                        </div>
                        {!isWeb &&
                            <span>
                                <VideoLabel className="make-cover-icon" />
                                <span>Make cover</span>
                            </span>
                        }
                    </div>
                </div>
                {isPopover &&
                    <CheckDeletePopover
                        remove={this.removeAttach}
                        type={'attachment'}
                        typeTitle={attachment.name}
                        togglePopover={this.togglePopover}
                        currentTarget={currentTarget}
                    />
                }
                {isEditPopover &&
                    <EditAttachmentPopover
                        togglePopover={this.toggleEditPopover}
                        currentTarget={currentTarget}
                        updateAttachment={this.updateAttachment}
                        attachment={attachment}
                    />
                }
            </div>
        )
    }
}

// createdAt: 1633032329759
// id: "12f50ccf3b1abf770e6418fd66d55750"
// name: "WhatsApp Image 2021-09-30 at 17.04.52"
// url: "https:/