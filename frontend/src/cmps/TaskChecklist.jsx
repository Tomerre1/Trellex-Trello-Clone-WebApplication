import React, { Component } from 'react';
import { TaskChecklistPreview } from './TaskChecklistPreview'


export class TaskChecklist extends Component {

    state = {
    }

    render() {
        const { currTask , updateTaskDetails } = this.props
        if (!currTask.checklist) return <React.Fragment></React.Fragment>
        return (
            <div className="task-checklists" >
                {currTask.checklist.map(checklist => {
                    return <TaskChecklistPreview
                        key={checklist.id}
                        checklist={checklist}
                        currTask={currTask}
                        updateTaskDetails={updateTaskDetails}

                    />
                })}
            </div>
        )
    }

}