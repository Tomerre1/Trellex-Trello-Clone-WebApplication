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
        currentTarget: null,
        bgUrl: null,
    }

    componentDidMount() {
        const { currTask } = this.props
        const bgUrl = currTask.style && currTask.style.bgUrl
        this.setState(prevState => ({ ...prevState, bgUrl }))
    }

    componentDidUpdate(prevProps, prevState) {
        const { currTask } = this.props
        const bgUrl = currTask.style && currTask.style.bgUrl
        if (bgUrl !== prevState.bgUrl) {
            this.setState(prevState => ({ ...prevState, bgUrl }))
        }
    }

    toggleBgUrl = () => {
        this.setState(prevState => ({ ...prevState, bgUrl: !prevState.bgUrl }))
    }

    togglePopover = () => {
        this.setState(prevState => ({ ...prevState, isEditPopover: false, isPopover: !prevState.isPopover }))
    }
    toggleEditPopover = () => {
        this.setState(prevState => ({ ...prevState, isPopover: false, isEditPopover: !prevState.isEditPopover }))
    }

    setCurrentTarget = (event) => {
        this.setState(prevState => ({ ...prevState, currentTarget: event }))
    }

    removeAttach = () => {
        const { updateTaskDetails, currTask, addActivity, attachment, setBgUrlCover } = this.props
        const attachs = currTask.attachments.filter(currAttach => currAttach.id !== attachment.id)
        currTask.attachments = attachs
        setBgUrlCover(null)
        updateTaskDetails(currTask)
        this.togglePopover()
        addActivity('remove-attachment', attachment.name)
    }

    onRemoveAttach = (ev) => {
        this.setCurrentTarget(ev)
        this.togglePopover()
    }

    setCover = () => {
        const { updateTaskDetails, currTask, attachment, setBgUrlCover } = this.props
        currTask.style.bgUrl = attachment.url
        setBgUrlCover(attachment.url)
        this.toggleBgUrl()
        updateTaskDetails(currTask)
    }

    removeCover = () => {
        const { updateTaskDetails, currTask, setBgUrlCover } = this.props
        currTask.style.bgUrl = ''
        this.toggleBgUrl()
        setBgUrlCover(null)
        updateTaskDetails(currTask)
    }

    onEditAttach = (ev) => {
        this.setCurrentTarget(ev)
        this.toggleEditPopover()
    }

    updateAttachment = (url, urlName) => {
        const { updateTaskDetails, currTask, attachment } = this.props
        attachment.url = url
        attachment.name = urlName
        updateTaskDetails(currTask)
        this.toggleEditPopover()
    }

    render() {
        const { attachment } = this.props
        const { isPopover, currentTarget, isEditPopover, bgUrl } = this.state
        const { isWeb } = attachment
        return (
            <div className="attachment-preview flex">
                {(isWeb) ?
                    <Link className="attachment-thumbnail flex" to={{ pathname: `${attachment.url}` }} target="_blank" title={`${attachment.name}`}>
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

                        {!isWeb && !bgUrl &&
                            <span>
                                <VideoLabel className="make-cover-icon" />
                                <span onClick={this.setCover}>Make cover</span>
                            </span>
                        }
                        {!isWeb && bgUrl &&
                            <span>
                                <VideoLabel className="make-cover-icon" />
                                <span onClick={this.removeCover}>Remove cover</span>
                            </span>
                        }

                    </div>
                </div>
                {
                    isPopover &&
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