import React, { Component } from 'react';
import { connect } from "react-redux";
import { utilService } from '../services/util.service';
import VideoLabel from '@mui/icons-material/VideoLabel';
import { CheckDeletePopover } from './CheckDeletePopover'
import { EditAttachmentPopover } from './EditAttachmentPopover'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Link } from 'react-router-dom';
import { saveBoard, saveTaskDetails, addActivity } from '../store/board.actions'
import { setPosition, setPopover, setCurrTaskDetails, togglePopover } from '../store/app.actions';




export class _TaskAttachmentPreview extends Component {
    state = {
        isPopover: false,
        isEditPopover: false,
        bgUrl: null,
    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        const bgUrl = currTaskDetails.style && currTaskDetails.style.bgUrl
        this.setState(prevState => ({ ...prevState, bgUrl, currGroup }))
    }

    componentDidUpdate(prevProps, prevState) {
        const { currTaskDetails } = this.props
        const bgUrl = currTaskDetails.style && currTaskDetails.style.bgUrl
        if (bgUrl !== prevState.bgUrl) {
            this.setState(prevState => ({ ...prevState, bgUrl }))
        }
    }

    toggleBgUrl = () => {
        this.setState(prevState => ({ ...prevState, bgUrl: !prevState.bgUrl }))
    }

    removeAttach = async () => {
        const { board, currTaskDetails, saveTaskDetails, addActivity, attachment, setCurrTaskDetails, togglePopover } = this.props
        const { currGroup } = this.state
        const attachs = currTaskDetails.attachments.filter(currAttach => currAttach.id !== attachment.id)
        currTaskDetails.attachments = attachs
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
        togglePopover()
        this.setIsPopover(false)
        addActivity(board, currTaskDetails, 'remove-attachment', attachment.name)
    }

    setCover = async () => {
        const { board, saveTaskDetails, currTaskDetails, attachment, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        currTaskDetails.style.bgUrl = attachment.url
        this.toggleBgUrl()
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    removeCover = async () => {
        const { board, saveTaskDetails, currTaskDetails, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        currTaskDetails.style.coverMode = null
        currTaskDetails.style.bgColor = null
        currTaskDetails.style.bgUrl = null
        this.toggleBgUrl()
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    setIsEditPopover = (isEditPopover) => {
        this.setState(prevState => ({ ...prevState, isEditPopover }))
    }
    setIsPopover = (isPopover) => {
        this.setState(prevState => ({ ...prevState, isPopover }))
    }

    updateAttachment = async (url, urlName) => {
        const { board, saveTaskDetails, currTaskDetails, attachment, setCurrTaskDetails, togglePopover } = this.props
        const { currGroup } = this.state
        if (!urlName) urlName = 'Attachment'
        attachment.url = url
        attachment.name = urlName
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
        togglePopover()
        this.setIsEditPopover(false)
    }

    render() {
        const { attachment, popover } = this.props
        const { isPopover, isEditPopover, bgUrl } = this.state
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
                        <span className="attachment-title">{(attachment.name.length > 15) ? attachment.name.substr(0, 15) + '...' : attachment.name}</span>
                        <div className="attachment-actions">
                            <span className="attachment-date">Added {utilService.timeSince(attachment.createdAt)}</span>
                            <button className="activity-toggle-btn" onClick={(event) => {
                                this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: '' });
                                this.props.setPopover(true)
                                this.setIsPopover(true)
                            }}>
                                Delete
                            </button>
                            <button className="activity-toggle-btn" onClick={(event) => {
                                this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: '' });
                                this.props.setPopover(true)
                                this.setIsEditPopover(true)
                            }}>
                                Edit
                            </button>
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
                {popover.isOpen && isPopover &&
                    <CheckDeletePopover
                        remove={this.removeAttach}
                        type={'attachment'}
                        typeTitle={attachment.name}
                        setIsPopover={this.setIsPopover}
                        setIsEditPopover={this.setIsEditPopover}
                    />
                }
                {popover.isOpen && isEditPopover &&
                    <EditAttachmentPopover
                        setIsPopover={this.setIsPopover}
                        setIsEditPopover={this.setIsEditPopover}
                        updateAttachment={this.updateAttachment}
                        attachment={attachment}
                    />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
        popover: state.appModule.popover,
    };
}
const mapDispatchToProps = {
    saveTaskDetails,
    saveBoard,
    setPosition,
    setPopover,
    addActivity,
    setCurrTaskDetails,
    togglePopover
};

export const TaskAttachmentPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TaskAttachmentPreview);