import React, { Component } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LabelIcon from '@material-ui/icons/LocalOfferOutlined';
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlined'
import CoverIcon from '@material-ui/icons/VideoLabel';
import MinusIcon from '@material-ui/icons/RemoveOutlined';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ScheduleIcon from '@mui/icons-material/Schedule';
export class TaskActionsMenu extends Component {
    render() {
        return (
            <aside className="task-details-sidebar flex column">
                <div className="actions-wrapper flex">
                    <div className="suggested flex column">
                        <h4>SUGGESTED</h4>
                        <button className="action-btn">
                            <div className="secondary-btn action-btn-content flex align-center">
                                <PersonOutlineIcon />
                                <span>Join</span>
                            </div>
                        </button>
                    </div>
                    <div className="add-to-card flex column">
                        <h4>ADD TO CARD</h4>

                        <button className="action-btn">
                            <div className="secondary-btn action-btn-content flex align-center">
                                <PersonAddAltIcon />
                                <span>Members</span>
                            </div>
                        </button>
                        <button className="action-btn">
                            <div className="secondary-btn action-btn-content flex align-center">
                                <LabelIcon />
                                <span>Labels</span>
                            </div>
                        </button>
                        <button className="action-btn">
                            <div className="secondary-btn action-btn-content flex align-center">
                                <CheckboxIcon />
                                <span>Checklist</span>
                            </div>
                        </button>
                        <button className="action-btn">
                            <div className="secondary-btn action-btn-content flex align-center">
                                <ScheduleIcon />
                                <span>Date</span>
                            </div>
                        </button>
                        <button className="action-btn">
                            <div className="secondary-btn action-btn-content flex align-center">
                                <AttachFileIcon />
                                <span>Attachment</span>
                            </div>
                        </button>
                        <button className="action-btn">
                            <div className="secondary-btn action-btn-content flex align-center">
                                <CoverIcon />
                                <span>Cover</span>
                            </div>
                        </button>
                    </div>
                </div>

            </aside>
        )
    }
}
