import React, { Component } from 'react';
import { connect } from "react-redux";
import { TaskChecklistPreview } from './TaskChecklistPreview'


export class _TaskChecklist extends Component {

    state = {
    }

    render() {
        const { currTaskDetails } = this.props
        if (!currTaskDetails.checklists) return <React.Fragment></React.Fragment>
        return (
            <div className="task-checklists" >
                {currTaskDetails.checklists.map(checklist => {
                    return <TaskChecklistPreview
                        key={checklist.id}
                        checklist={checklist}
                    />
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
    };
}


export const TaskChecklist = connect(mapStateToProps)(_TaskChecklist);