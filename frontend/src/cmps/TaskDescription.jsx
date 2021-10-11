import React, { Component } from "react";
import { Close } from '@mui/icons-material';
import SubjectIcon from '@mui/icons-material/Subject';

export class TaskDescription extends Component {
    state = {
        description: '',
        isEditMode: false
    }

    componentDidMount() {
        const description = this.props.currTask.description ? this.props.currTask.description : ''
        this.setState(prevState => ({ ...prevState, description }))
    }

    onSaveDescription = () => {
        const { description } = this.state
        const { currTask, updateTaskDetails } = this.props
        currTask.description = description
        updateTaskDetails(currTask)
        this.setState({ isEditMode: false })
    }
    handleChange = ({ target: { value } }) => {
        this.setState({ description: value })
    }

    onToggleEdit = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }
    onEditMode = () => {
        this.selectedInput.focus()
        this.setState({ isEditMode: true })
    }

    render() {
        const { isEditMode, description } = this.state
        return (
            <div className="task-description flex column">
                <div className="window-modal-title flex align-center">
                    <SubjectIcon />
                    <h3>Description</h3>
                    <button
                        className={`task-btns edit-task-description-btn ${!isEditMode ? 'full-opacity' : 'none-opacity'}`}
                        onClick={() => this.onEditMode()}>
                        Edit
                    </button>
                </div>
                <div className="card-description-edit flex column">
                    <textarea onClick={this.onEditMode}
                        ref={(input) => { this.selectedInput = input; }}
                        onBlur={this.onSaveDescription}
                        value={description}
                        placeholder="Add a more detailed description..."
                        onChange={this.handleChange}>
                    </textarea>

                    <div className={`description-btns flex align-center ${isEditMode ? 'show' : 'hidden'}`}>
                        <button className='task-btns save-task-description-btn' onClick={() => this.onSaveDescription()}>Save</button>
                        <button className='task-btns close-task-description-btn' onClick={() => this.onToggleEdit()}><Close /></button>
                    </div>
                </div>
            </div>)
    }

}