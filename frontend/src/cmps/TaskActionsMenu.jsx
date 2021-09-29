import React, { Component } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LabelIcon from '@material-ui/icons/LocalOfferOutlined';
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlined'
import CoverIcon from '@material-ui/icons/VideoLabel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArchiveIcon from '@mui/icons-material/Archive';
export class TaskActionsMenu extends Component {
    render() {
        const { setCurrentTarget } = this.props
        return (
            <aside className="task-details-sidebar flex column full">
                <div className="actions-wrapper flex">
                    <div className="suggested flex column">
                        <h4>SUGGESTED</h4>
                        <button className="secondary-btn action-btn" >
                            <div className="action-btn-content flex align-center" onClick={(event) => { }}>
                                <PersonOutlineIcon />
                                <span>Join</span>
                            </div>
                        </button>
                    </div>
                    <div className="add-to-card flex column">
                        <h4>ADD TO CARD</h4>

                        <button className="secondary-btn action-btn" >
                            <div className=" action-btn-content flex align-center" onClick={(event) => { setCurrentTarget(event, 'MEMBERS') }}>
                                <PersonAddAltIcon />
                                <span>Members</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" >
                            <div className="action-btn-content flex align-center" onClick={(event) => { setCurrentTarget(event, 'LABELS'); }}>
                                <LabelIcon />
                                <span>Labels</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" >
                            <div className="action-btn-content flex align-center" onClick={(event) => { setCurrentTarget(event, 'CHECKLIST') }}>
                                <CheckboxIcon />
                                <span>Checklist</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" >
                            <div className=" action-btn-content flex align-center" onClick={(event) => { setCurrentTarget(event, 'DATE') }}>
                                <ScheduleIcon />
                                <span>Date</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" >
                            <div className="action-btn-content flex align-center" onClick={(event) => { setCurrentTarget(event, 'ATTACHMENT') }}>
                                <AttachFileIcon />
                                <span>Attachment</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" >
                            <div className=" action-btn-content flex align-center" onClick={(event) => { setCurrentTarget(event, 'COVER') }}>
                                <CoverIcon />
                                <span>Cover</span>
                            </div>
                        </button>
                    </div>
                    <div className="actions flex column">
                        <h4>ACTIONS</h4>
                        <button className="secondary-btn action-btn" >
                            <div className="action-btn-content flex align-center" onClick={(event) => { setCurrentTarget(event) }}>
                                <ArrowForwardIcon />
                                <span>Move</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" >
                            <div className="action-btn-content flex align-center" onClick={(event) => { setCurrentTarget(event) }}>
                                <CopyIcon />
                                <span>Copy</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" >
                            <div className="action-btn-content flex align-center" onClick={(event) => { setCurrentTarget(event) }}>
                                <ArchiveIcon />
                                <span>Archive</span>
                            </div>
                        </button>
                    </div>
                </div>

            </aside>
        )
    }
}
