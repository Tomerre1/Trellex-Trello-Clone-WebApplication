import React, { Component } from "react";
import { Close } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export class TodoPreview extends Component {

    state = {
        todo: null,
        isEditMode: false
    }
    selectedInput = null;

    componentDidMount() {
        const { todo } = this.props
        this.setState(prevState => ({ ...prevState, todo }))
    }

    handleChange = ({ target: { value } }) => {
        this.setState(prevState => ({ ...prevState, todo: { ...this.state.todo, title: value } }))
    }

    onEditMode = () => {
        if (this.selectedInput) this.selectedInput.focus()
        this.setState({ isEditMode: true })
    }

    onSaveTodo = () => {
        this.setState({ isEditMode: false })
    }

    render() {
        const { todo, isEditMode } = this.state
        if (!todo) return <div>Loading...</div>
        const { title, isDone } = todo

        return (

            <div className="todo-preview-container flex column">
                <div className="todo-preview flex align-center">
                    {/* {todo.isDone && <CheckBoxOutlineBlankIcon />} */}
                    {/* {todo.isDone && <CheckBoxOutlinedIcon />} */}
                    <CheckBoxOutlineBlankIcon />
                    {isEditMode &&
                        <textarea onClick={this.onEditMode}
                            ref={(input) => { this.selectedInput = input; }}
                            onBlur={this.onSaveTodo}
                            value={title}
                            onChange={this.handleChange}>
                        </textarea>
                    }
                    {!isEditMode && <span onClick={this.onEditMode}>{title}</span>}
                </div>
                <div className={`checklist-btns flex align-center ${isEditMode ? 'show' : 'hidden'}`}>
                    <button className="primary-btn">Save</button>
                    <Close />
                </div >
            </div >
        )
    }

}