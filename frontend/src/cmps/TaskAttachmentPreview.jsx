import React, { Component } from 'react';
import { utilService } from '../services/util.service';
import VideoLabel from '@mui/icons-material/VideoLabel';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Link } from 'react-router-dom';


export class TaskAttachmentPreview extends Component {


    state = {

    }

    removeAttach = async (attachId) => {
        const { currTask, updateTaskDetails } = this.props
        const { attachments } = currTask
        const attachs = attachments.filter(currAttach => currAttach.id !== attachId)
        currTask.attachments = attachs
        updateTaskDetails(currTask)
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
        const { isWeb } = attachment
        console.log('%c  attachment:', 'color: #00000;background: #aaefe5;', attachment);
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
                            <button onClick={() => this.removeAttach(attachment.id)}>Delete</button>
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
            </div >
        )
    }
}

// createdAt: 1633032329759
// id: "12f50ccf3b1abf770e6418fd66d55750"
// name: "WhatsApp Image 2021-09-30 at 17.04.52"
// url: "https:/