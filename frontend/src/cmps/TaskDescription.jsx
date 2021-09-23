import React, { Component } from "react";
// import SubjectIcon from '@material-ui/icons/Subject';
import { Close } from '@mui/icons-material';
import SubjectIcon from '@mui/icons-material/Subject';



export class TaskDescription extends Component {
    state = {
        description: '',
        isEditMode: false
    }


    onSaveDescription = () => {
        const { description } = this.state
        console.log('Saving Description...', description)
        this.setState({ isEditMode: false })
        // const { description } = this.state
        // this.setState({ isInputSelected: false }, () => {
        //     this.props.onSaveCardDescription(description)
        // })
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
                    {!isEditMode &&
                        <button
                            className="task-btns edit-task-description-btn"
                            onClick={() => this.onEditMode()}>
                            Edit
                        </button>}
                </div>
                <div className="card-description-edit flex column">
                    <textarea onClick={() => this.onEditMode()}
                        ref={(input) => { this.selectedInput = input; }}
                        value={description}
                        placeholder="Add a more detailed description..."
                        onChange={this.handleChange}></textarea>

                    <div className={`description-controls flex align-center ${isEditMode ? 'show' : 'hidden'}`}>
                        <button className='task-btns save-task-description-btn' onClick={() => this.onSaveDescription()}>Save</button>
                        <button className='task-btns close-task-description-btn' onClick={() => this.onToggleEdit()}><Close /></button>
                    </div>
                </div>
            </div>)
    }

}