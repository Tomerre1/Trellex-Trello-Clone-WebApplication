import React, { Component } from "react";



export class TaskAttachment extends Component {
    state = {

    }



    render() {
        const { currTask, updateTaskDetails, addActivity } = this.props
        if (!currTask.attachments) return <React.Fragment></React.Fragment>

        return (
            <div className="task-attach">

            </div>
        )
    }

}