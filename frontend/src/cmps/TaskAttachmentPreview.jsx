import React, { Component } from 'react';
import { utilService } from '../services/util.service';

export class TaskAttachmentPreview extends Component {


    state = {

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


        console.log('attachment', attachment)
        return (
            <div className="attachment-preview flex">
                {/* <a className="attachment-thumbnail" href={`${attachment.url}`} target="_blank" title={`${attachment.name}`} style={{ backgroundImage: (`${attachment.url}`), backgroundColor: '#051e46' }} rel="noreferrer nofollow noopener"></a> */}
                <img src={attachment.url} alt={attachment.name} />
                <div className="attachment-content">
                    <div className="attachment-details">
                        <p className="attachment-title">{attachment.name}</p>
                        <div className="attachment-actions">
                            <span className="attachment-date">Added {utilService.timeSince(attachment.createdAt)}</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

// createdAt: 1633032329759
// id: "12f50ccf3b1abf770e6418fd66d55750"
// name: "WhatsApp Image 2021-09-30 at 17.04.52"
// url: "https:/