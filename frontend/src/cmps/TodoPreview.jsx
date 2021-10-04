import React, { Component } from "react";
import { Close } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from "react-redux";
import { addActivity } from '../store/board.actions'

export class _TodoPreview extends Component {

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
        const { addActivity, board, currTaskDetails } = this.props
        todo.isDone = !todo.isDone
        this.setState(prevState => ({ ...prevState, todo }))
        this.props.onSaveTodo(todo)
        if (todo.isDone) addActivity(board, currTaskDetails, 'complete-todo', todo.title)
        else addActivity(board, currTaskDetails, 'incomplete-todo', todo.title)
    }

    onRemoveTodo = () => {
        const { todo } = this.state
        this.props.onRemoveTodo(todo)
    }

    onUndoChange = () => {
        const { todo } = this.props
        const { todoTitle } = this.state
        todo.title = todoTitle
        this.setState(prevState => ({ ...prevState, todo }))
        this.onToggleEditMode()
    }

    render() {
        const { todo, isEditMode } = this.state
        if (!todo) return <div>Loading...</div>
        const { title } = todo

        return (

            <div className="todo-preview-container flex column">
                <div className="todo-preview flex align-center">
                    {todo.isDone && <CheckBoxIcon onClick={this.onToggleTodoIsDone} className="todo-check" />}
                    {!todo.isDone && <CheckBoxOutlineBlankIcon onClick={this.onToggleTodoIsDone} />}
                    {isEditMode &&
                        <textarea onClick={this.onEditMode}
                            className="default-textarea"
                            ref={(input) => { this.selectedInput = input; }}
                            // onBlur={this.onUndoChange}
                            value={title}
                            onChange={this.handleChange}>
                        </textarea>
                    }
                    {!isEditMode && <div className="checklist-txt-and-btn">
                        <span className={`${todo.isDone ? 'done' : ''}`} onClick={this.onEditMode}>{title}</span>
                        <DeleteIcon className="todo-remove-icon" onClick={this.onRemoveTodo}  />
                    </div>}
                </div>
                <div className={`checklist-btns flex align-center ${isEditMode ? 'show' : 'hidden'}`}>
                    <button onClick={this.onSaveTodo} className="nch-btn primary-btn">Save</button>
                    <Close onClick={this.onUndoChange} className="close-btn" />
                </div >
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
    };
}
const mapDispatchToProps = {
    addActivity
};

export const TodoPreview = connect(mapStateToProps, mapDispatchToProps)(_TodoPreview);