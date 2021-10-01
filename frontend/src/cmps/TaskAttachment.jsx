import React, { Component } from "react";
import { TaskAttachmentPreview } from './TaskAttachmentPreview'
import AttachFileIcon from '@mui/icons-material/AttachFile';

export class TaskAttachment extends Component {
    state = {

    }

    render() {
        const { currTask, updateTaskDetails, addActivity, setBgUrlCover } = this.props
        if (!currTask.attachments) return <React.Fragment></React.Fragment>

        return (
            <div className="task-attach">
                <div className="window-modal-title flex align-center">
                    <AttachFileIcon />
                    <h3>Attachment</h3>
                </div>
                <div className="attachments">
                    {currTask.attachments.map(attachment => {
                        return <TaskAttachmentPreview
                            key={attachment.id}
                            attachment={attachment}
                            currTask={currTask}
                            updateTaskDetails={updateTaskDetails}
                            addActivity={addActivity}
                            setBgUrlCover={setBgUrlCover}
                        />
                    })}
                </div>
            </div>
        )
    }
}

