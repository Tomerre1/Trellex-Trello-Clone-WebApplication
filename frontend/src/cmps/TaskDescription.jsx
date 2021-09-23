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
        console.log('Save Description')
        this.setState({ isEditMode: false })
        // const { description } = this.state
        // this.setState({ isInputSelected: false }, () => {
        //     this.props.onSaveCardDescription(description)
        // })
    }

    onToggleEdit = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }
    onEditMode = () => {
        this.setState({ isEditMode: true })
    }


    render() {
        const { isEditMode } = this.state
        return (
            <div className="task-description flex column">
                <div className="window-modal-title flex align-center">
                    <SubjectIcon />
                    <h3>Description</h3>
                    <button
                    className="edit-task-description-btn"
                        onClick={() => this.onToggleEdit()}>
                        Edit
                    </button>
                </div>
                <div className="card-description-edit flex column">
                <textarea onClick={() => this.onEditMode()}></textarea>
                    {/* {!isEditMode && <p>Bla bla bla</p>}
                    {isEditMode &&
                        <textarea></textarea>
                    } */}
                    <div className={`description-controls flex align-center ${isEditMode ? 'show' : 'hidden'}`}>
                        <button className='save-task-description-btn' onClick={() => this.onSaveDescription()}>Save</button>
                        <button className='close-task-description-btn' onClick={() => this.onToggleEdit()}><Close /></button>
                    </div>
                </div>
            </div>)
    }

}