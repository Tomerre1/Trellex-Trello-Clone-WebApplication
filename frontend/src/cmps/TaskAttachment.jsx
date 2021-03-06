import React from "react";
import { TaskAttachmentPreview } from './TaskAttachmentPreview'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { connect } from "react-redux";

export function _TaskAttachment({ currTaskDetails }) {
    if (!currTaskDetails.attachments || !currTaskDetails.attachments.length) return <React.Fragment></React.Fragment>
    return (
        <div className="task-attach">
            <div className="window-modal-title flex align-center">
                <AttachFileIcon />
                <h3>Attachment</h3>
            </div>
            <div className="attachments">
                {currTaskDetails.attachments.map(attachment => {
                    return <TaskAttachmentPreview
                        key={attachment.id}
                        attachment={attachment}
                    />
                })}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
    };
}

export const TaskAttachment = connect(
    mapStateToProps,
    null
)(_TaskAttachment);
