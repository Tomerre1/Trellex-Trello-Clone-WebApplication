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
    render() {
        const { isEditMode, todo } = this.state
        return (
            <div className="todo-add-container">
                {isEditMode &&
                    <textarea onClick={this.onEditMode}
                        // ref={(input) => { this.selectedInput = input; }}
                        // onBlur={this.onSaveDescription}
                        value={todo.title}
                        placeholder="Add an item"
                        onChange={this.handleChange}>
                    </textarea>
                }
                <button
                    className={`task-btns nch-btn todo-add-btn ${!isEditMode ? 'full-opacity' : 'none-opacity'}`}
                    onClick={() => this.onToggleEditMode()}>
                    Add an item
                </button>
            </div>
        )
    }
}