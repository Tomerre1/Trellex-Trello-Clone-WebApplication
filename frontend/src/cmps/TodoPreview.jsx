import React, { Component } from "react";
import { Close } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export class TodoPreview extends Component {

    state = {
        todo: null,
        todoTitle: '',
        isEditMode: false
    }
    selectedInput = null;

    componentDidMount() {
        const { todo } = this.props
        this.setState(prevState => ({ ...prevState, todo, todoTitle: todo.title }))
    }

    handleChange = ({ target: { value } }) => {
        this.setState(prevState => ({ ...prevState, todo: { ...this.state.todo, title: value } }))
    }

    onEditMode = () => {
        if (this.selectedInput) this.selectedInput.focus()
        this.setState({ isEditMode: true })
    }

    onToggleEditMode = () => {
        this.setState(prevState => ({ ...prevState, isEditMode: !this.state.isEditMode }))
    }

    onSaveTodo = () => {
        const { todo } = this.state
        this.props.onSaveTodo(todo)
        this.onToggleEditMode()
    }

    onToggleTodoIsDone = () => {
        const { todo } = this.state
        todo.isDone = !todo.isDone
        this.setState(prevState => ({ ...prevState, todo }))
        this.props.onSaveTodo(todo)
    }

    onRemoveTodo = () => {
        const { todo } = this.state
        this.props.onRemoveTodo(todo)
    }


    onUndoChange = () => {
        console.log('#####onUndoChange####')
        const { todo } = this.props
        const { todoTitle } = this.state
        todo.title = todoTitle
        this.setState(prevState => ({ ...prevState, todo }))
        this.onToggleEditMode()
    }

    render() {
        const { todo, isEditMode } = this.state
        if (!todo) return <div>Loading...</div>
        const { title, isDone } = todo

        return (

            <div className="todo-preview-container flex column">
                <div className="todo-preview flex align-center">
                    {todo.isDone && <CheckBoxIcon onClick={this.onToggleTodoIsDone} className="todo-check" />}
                    {!todo.isDone && <CheckBoxOutlineBlankIcon onClick={this.onToggleTodoIsDone} />}
                    {isEditMode &&
                        <textarea onClick={this.onEditMode}
                            ref={(input) => { this.selectedInput = input; }}
                            // onBlur={this.onUndoChange}
                            value={title}
                            onChange={this.handleChange}>
                        </textarea>
                    }
                    {!isEditMode && <div className="checklist-txt-and-btn">
                        <span className={`${todo.isDone ? 'done' : ''}`} onClick={this.onEditMode}>{title}</span>
                        <DeleteIcon onClick={this.onRemoveTodo} className="todo-remove-icon"/>
                    </div>}
                </div>
                <div className={`checklist-btns flex align-center ${isEditMode ? 'show' : 'hidden'}`}>
                    <button onClick={this.onSaveTodo} className="nch-btn primary-btn">Save</button>
                    {/* <button onClick={this.onUndoChange} className="close-btn"><Close/></button> */}
                    <Close onClick={this.onUndoChange} className="close-btn" />
                </div >
            </div >
        )
    }

}