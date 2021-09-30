import React, { Component } from 'react';
import { TaskChecklistPreview } from './TaskChecklistPreview'


export class TaskChecklist extends Component {

    state = {
    }

    render() {
        const { currTask , updateTaskDetails, addActivity } = this.props
        if (!currTask.checklists) return <React.Fragment></React.Fragment>
        return (
            <div className="task-checklists" >
                {currTask.checklists.map(checklist => {
                    return <TaskChecklistPreview
                        key={checklist.id}
                        checklist={checklist}
                        currTask={currTask}
                        updateTaskDetails={updateTaskDetails}
                        addActivity={addActivity}
                    />
                })}
            </div>
        )
    }

}