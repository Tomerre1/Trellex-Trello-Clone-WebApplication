import React, { Component } from 'react';
import { TodoList } from './TodoList'
import { CheckDeleteChecklistPopover } from './CheckDeleteChecklistPopover'
import { TodoAdd } from './TodoAdd'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ProgressBar } from './ProgressBar'

export class TaskChecklistPreview extends Component {


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

    onSaveTodo = (todo) => {
        const { currTask, updateTaskDetails, checklist } = this.props
        const checklistIdx = currTask.checklists.indexOf(checklist)

        const todoIdx = currTask.checklists[checklistIdx].todos.findIndex((currTodo) => {
            return currTodo.id === todo.id
        })

        currTask.checklists[checklistIdx].todos[todoIdx] = todo
        updateTaskDetails(currTask)
    }

    onRemoveTodo = (todo) => {
        const { currTask, updateTaskDetails, checklist } = this.props
        const checklistIdx = currTask.checklists.indexOf(checklist)

        const todoIdx = currTask.checklists[checklistIdx].todos.findIndex((currTodo) => {
            return currTodo.id === todo.id
        })

        currTask.checklists[checklistIdx].todos.splice(todoIdx, 1)
        updateTaskDetails(currTask)
    }

    onAddTodo = (todo) => {
        const { currTask, updateTaskDetails, checklist } = this.props
        const checklistIdx = currTask.checklists.indexOf(checklist)
        currTask.checklists[checklistIdx].todos.push(todo)
        updateTaskDetails(currTask)
    }

    doneTodosCalc = () => {
        const { checklist } = this.props
        const { todos } = checklist
        if (!todos.length) return 0

        let isDoneTodos = 0
        todos.forEach(todo => {
            if (todo.isDone) isDoneTodos++
        })

        return (isDoneTodos / checklist.todos.length) * 100
    }

    render() {
        const { checklist, currTask, updateTaskDetails } = this.props
        const { isPopover, currentTarget } = this.state

        return (
            <div className="task-activities flex column">
                <div className="window-modal-title flex space-between">
                    <div className="task-activities-header flex align-center">
                        <CheckBoxOutlinedIcon />
                        <h3>{checklist.title}</h3>
                    </div>
                    <button className="activity-toggle-btn" onClick={(event) => { this.setCurrentTarget(event) }}>
                        Delete
                    </button>
                </div>
                <ProgressBar doneTodosCalc={this.doneTodosCalc}/>
                <TodoList
                    todos={checklist.todos}
                    onSaveTodo={this.onSaveTodo}
                    onRemoveTodo={this.onRemoveTodo}
                />
                {isPopover &&
                    <CheckDeleteChecklistPopover
                        togglePopover={this.togglePopover}
                        currentTarget={currentTarget}
                        checklist={checklist}
                        // updateBoard={this.updateBoard}
                        updateTaskDetails={updateTaskDetails}
                        // type={type}
                        currTask={currTask}
                    />
                }
                <TodoAdd onAddTodo={this.onAddTodo} />
            </div>
        )
    }

}