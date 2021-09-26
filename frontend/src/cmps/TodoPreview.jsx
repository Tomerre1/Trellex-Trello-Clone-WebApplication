import React, { Component } from "react";
import { Close } from '@mui/icons-material';

export class TodoPreview extends Component {

    state = {
        todo: null,
        isEditMode: false
    }

    componentDidMount() {
        const { todo } = this.props
        this.setState(prevState => ({ ...prevState, todo }))
    }

    // handleChange = (ev) => {
    //     console.log(ev.target.value)
    //     console.log(this.state.todo)
    //     this.setState({ ...this.state.todo, title: ev.target.value })
    // }

    handleChange = ({ target: { value } }) => {
        this.setState(prevState => ({ ...prevState, todo: {...this.state.todo , title: value} }))
    }

    onEditMode = () => {
        this.selectedInput.focus()
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
                    <textarea onClick={this.onEditMode}
                        ref={(input) => { this.selectedInput = input; }}
                        onBlur={this.onSaveTodo}
                        value={title}
                        onChange={this.handleChange}>
                    </textarea>
                </div>
                <div className={`checklist-btns flex align-center ${isEditMode ? 'show' : 'hidden'}`}>
                    <button className="primary-btn">Save</button>
                    <Close />
                </div >
            </div >
        )
    }

}