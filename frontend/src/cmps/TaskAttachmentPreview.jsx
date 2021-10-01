import React, { Component } from 'react';
import { utilService } from '../services/util.service';
import VideoLabel from '@mui/icons-material/VideoLabel';
import { CheckDeletePopover } from './CheckDeletePopover'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Link } from 'react-router-dom';


export class TaskAttachmentPreview extends Component {


    state = {
        isPopover: false,
        currentTarget: null
    }

    togglePopover = () => {
        this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
    }

    setCurrentTarget = (event) => {
        this.setState(prevState => ({ ...prevState, currentTarget: event }))
        this.togglePopover()
    };

    removeAttach = () => {
        const { updateTaskDetails, currTask, addActivity, attachment } = this.props
        const attachs = currTask.attachments.filter(currAttach => currAttach.id !== attachment.id)
        currTask.attachments = attachs
        updateTaskDetails(currTask)
        this.togglePopover()
        addActivity('remove-attachment', attachment.name)
    }

    // onRemoveTodo = (todo) => {
    //     const { currTask, updateTaskDetails, checklist } = this.props
    //     const checklistIdx = currTask.checklists.indexOf(checklist)

    //     const todoIdx = currTask.checklists[checklistIdx].todos.findIndex((currTodo) => {
    //         return currTodo.id === todo.id
    //     })

    //     currTask.checklists[checklistIdx].todos.splice(todoIdx, 1)
    //     updateTaskDetails(currTask)
    // }

    // onAddTodo = (todo) => {
    //     const { currTask, updateTaskDetails, checklist } = this.props
    //     const checklistIdx = currTask.checklists.indexOf(checklist)
    //     currTask.checklists[checklistIdx].todos.push(todo)
    //     updateTaskDetails(currTask)
    // }


    render() {
        const { attachment, currTask, updateTaskDetails, addActivity } = this.props

        const { isPopover, currentTarget } = this.state

        console.log('attachment', attachment)
        console.log('currTask', currTask)
        const { isWeb } = attachment
        console.log('%c  attachment:', 'color: #00000;background: #aaefe5;', attachment);
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
                            <button onClick={(event) => { this.setCurrentTarget(event) }}>Delete</button>
                            <button>Edit</button>
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
            </div>
        )
    }
}

// createdAt: 1633032329759
// id: "12f50ccf3b1abf770e6418fd66d55750"
// name: "WhatsApp Image 2021-09-30 at 17.04.52"
// url: "https:/