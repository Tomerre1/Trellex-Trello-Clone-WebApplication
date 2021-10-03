import React, { Component } from 'react';
import { connect } from "react-redux";
import { utilService } from '../services/util.service';
import VideoLabel from '@mui/icons-material/VideoLabel';
import { CheckDeletePopover } from './CheckDeletePopover'
import { EditAttachmentPopover } from './EditAttachmentPopover'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Link } from 'react-router-dom';

import { saveBoard, saveTaskDetails, addActivity } from '../store/board.actions'
// import { togglePopover } from '../../store/app.actions'
import { setPosition, setPopover } from '../store/app.actions';


export class _TaskAttachmentPreview extends Component {
    state = {
        isPopover: false,
        isEditPopover: false,
        currentTarget: null,
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

    togglePopover = () => {
        this.setState(prevState => ({ ...prevState, isEditPopover: false, isPopover: !prevState.isPopover }))
    }
    toggleEditPopover = () => {
        this.setState(prevState => ({ ...prevState, isPopover: false, isEditPopover: !prevState.isEditPopover }))
    }

    setCurrentTarget = (event) => {
        this.setState(prevState => ({ ...prevState, currentTarget: event }))
    }

    removeAttach = async () => {
        const { board, currTaskDetails, saveTaskDetails, addActivity, attachment } = this.props
        const { currGroup } = this.state
        const attachs = currTaskDetails.attachments.filter(currAttach => currAttach.id !== attachment.id)
        currTaskDetails.attachments = attachs
        // setBgUrlCover(null)
        await saveTaskDetails(board, currGroup, currTaskDetails)
        this.togglePopover()
        addActivity(board, currTaskDetails, 'remove-attachment', attachment.name)
    }

    onRemoveAttach = (ev) => {
        this.setCurrentTarget(ev)
        this.togglePopover()
    }

    setCover = async () => {
        const { board, saveTaskDetails, currTaskDetails, attachment } = this.props
        const { currGroup } = this.state
        currTaskDetails.style.bgUrl = attachment.url
        this.toggleBgUrl()
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    removeCover = async () => {
        const { board, saveTaskDetails, currTaskDetails } = this.props
        const { currGroup } = this.state
        currTaskDetails.style.coverMode = null
        currTaskDetails.style.bgColor = null
        currTaskDetails.style.bgUrl = null
        this.toggleBgUrl()
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    onEditAttach = (ev) => {
        this.setCurrentTarget(ev)
        this.toggleEditPopover()
    }

    updateAttachment = async (url, urlName) => {
        const { board, saveTaskDetails, currTaskDetails, attachment } = this.props
        const { currGroup } = this.state
        attachment.url = url
        attachment.name = urlName
        await saveTaskDetails(board, currGroup, currTaskDetails)
        this.toggleEditPopover()
    }

    render() {
        const { attachment, popover } = this.props
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
                            <button className="activity-toggle-btn" onClick={(event) => {
                                this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: '' });
                                this.props.setPopover(true)
                                this.togglePopover()
                            }}>
                                Delete
                            </button>
                            <button className="activity-toggle-btn" onClick={(event) => {
                                this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: '' });
                                this.props.setPopover(true)
                                this.toggleEditPopover()
                            }}>
                                Edit
                            </button>
                            {/* <button onClick={(event) => { this.onEditAttach(event) }}>Edit</button> */}
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
                        togglePopover={this.togglePopover}
                    />
                }
                {popover.isOpen && isEditPopover &&
                    <EditAttachmentPopover
                        togglePopover={this.toggleEditPopover}
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
    // togglePopover,
    setPosition,
    setPopover,
    addActivity
};

export const TaskAttachmentPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TaskAttachmentPreview);