import React, { Component } from "react";
import { Close } from '@mui/icons-material';
import { utilService } from '../services/util.service'

export class TodoAdd extends Component {
    state = {
        isEditMode: false,
        todo: {
            title: ''
        }
    }
    selectedInput=null

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState(prevState => ({ ...prevState, todo: { title: value } }))
    }
    onToggleEditMode = () => {
        const { isEditMode } = this.state
        this.setState(prevState => ({ ...prevState, isEditMode: !isEditMode }))
    }

    onTodoAdd = () => {
        const { todo } = this.state
        todo.id = utilService.makeId()
        todo.isDone = false
        this.setState(prevState => ({ ...prevState, todo }))    
        this.props.addTodo(todo)
        this.clearState()
    }

    clearState = () => {
        this.selectedInput.focus()
        this.setState(prevState => ({ ...prevState, todo: { title: '' } }))
    }

    render() {
        const { isEditMode, todo } = this.state
        return (
            <div className="todo-add-container">
                <button
                    className={`task-btns nch-btn todo-add-btn ${isEditMode ? 'hidden' : 'show'}`}
                    onClick={() => this.onToggleEditMode()}>
                    Add an item
                </button>
                {isEditMode &&
                    <div className="todo-edit flex column">
                        <textarea onClick={this.onEditMode}
                            ref={(input) => { this.selectedInput = input; }}
                            // onBlur={this.onToggleEditMode}
                            autoFocus
                            value={todo.title}
                            placeholder="Add an item"
                            onChange={this.handleChange}>
                        </textarea>

                        <div className={`todo-btns flex align-center ${isEditMode ? 'show' : 'hidden'}`}>
                            <button className='task-btns todo-save-btn' onClick={() => this.onTodoAdd()}>Add</button>
                            <button className='task-btns todo-close-btn' onClick={() => this.onToggleEditMode()}><Close /></button>
                        </div>
                    </div>

                }

            </div>
        )
    }
}