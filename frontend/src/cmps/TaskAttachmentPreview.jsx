import React, { Component } from 'react';

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

        return (
            <div className="attachment-preview">
                Attachment preview
            </div>
        )
    }

}