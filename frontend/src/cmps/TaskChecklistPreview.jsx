import React, { Component } from 'react';
import { TodoList } from './TodoList'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export class TaskChecklistPreview extends Component {


    state = {
    }

    onSaveTodo = (todo) => {
        const { currTask , updateTaskDetails} = this.props
        updateTaskDetails(currTask)
    }

    render() {
        const { checklist } = this.props
        return (
            <div className="task-activities flex column">
                <div className="window-modal-title flex space-between">
                    <div className="task-activities-header flex align-center">
                        <CheckBoxOutlinedIcon />
                        <h3>{checklist.title}</h3>
                    </div>
                </div>
                <TodoList
                        todos={checklist.todos}
                        onSaveTodo={this.onSaveTodo}
                    />
            </div>
        )
    }

}