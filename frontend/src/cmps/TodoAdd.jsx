import React, { Component } from "react";
import { Close } from '@mui/icons-material';

export class TodoAdd extends Component {
    state = {
        isEditMode: false,
        todo: {
            title: ''
        }
    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState(prevState => ({ ...prevState, todo: { title: value } }))
    }
    //TODO=> {title: "Todo 1", id: "5eqZQb", isDone: false}
    onToggleEditMode = () => {
        const { isEditMode } = this.state
        this.setState(prevState => ({ ...prevState, isEditMode: !isEditMode }))
    }

    onTodoAdd = () => {
        const {todo} = this.state
        console.log('Todo add...',todo)
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
                            // ref={(input) => { this.selectedInput = input; }}
                            // onBlur={this.onToggleEditMode}
                            autoFocus
                            value={todo.title}
                            placeholder="Add an item"
                            onChange={this.handleChange}>
                        </textarea>

                        <div className={`description-btns flex align-center ${isEditMode ? 'show' : 'hidden'}`}>
                            <button className='task-btns save-task-description-btn' onClick={() => this.onTodoAdd()}>Add</button>
                            <button className='task-btns close-task-description-btn' onClick={() => this.onToggleEditMode()}><Close /></button>
                        </div>
                    </div>

                }
                
            </div>
        )
    }
}