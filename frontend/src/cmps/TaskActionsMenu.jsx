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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export class TaskActionsMenu extends Component {
    render() {
        const { setCurrentTarget, joinTask, loggedinUserIsJoin, toggleIsArchive, isArchive } = this.props
        return (
            <aside className="task-details-sidebar flex column full">
                <div className="actions-wrapper flex">
                    {!loggedinUserIsJoin && <div className="suggested flex column">
                        <h4>SUGGESTED</h4>
                        <button className="secondary-btn action-btn" onClick={joinTask}>
                            <div className="action-btn-content flex align-center" >
                                <PersonOutlineIcon />
                                <span>Join</span>
                            </div>
                        </button>
                    </div>}
                    <div className="add-to-card flex column">
                        <h4>ADD TO CARD</h4>

                        <button className="secondary-btn action-btn" onClick={(event) => { setCurrentTarget(event, 'MEMBERS') }}>
                            <div className=" action-btn-content flex align-center" >
                                <PersonAddAltIcon />
                                <span>Members</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { setCurrentTarget(event, 'LABELS'); }}>
                            <div className="action-btn-content flex align-center" >
                                <LabelIcon />
                                <span>Labels</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { setCurrentTarget(event, 'CHECKLIST') }}>
                            <div className="action-btn-content flex align-center" >
                                <CheckboxIcon />
                                <span>Checklist</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { setCurrentTarget(event, 'DATE') }}>
                            <div className=" action-btn-content flex align-center" >
                                <ScheduleIcon />
                                <span>Date</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { setCurrentTarget(event, 'ATTACHMENT') }}>
                            <div className="action-btn-content flex align-center" >
                                <AttachFileIcon />
                                <span>Attachment</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { setCurrentTarget(event, 'COVER') }}>
                            <div className=" action-btn-content flex align-center" >
                                <CoverIcon />
                                <span>Cover</span>
                            </div>
                        </button>
                    </div>
                    <div className="actions flex column">
                        <h4>ACTIONS</h4>
                        <button className="secondary-btn action-btn" onClick={(event) => { setCurrentTarget(event, 'MOVE') }}>
                            <div className="action-btn-content flex align-center" >
                                <ArrowForwardIcon />
                                <span>Move</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { setCurrentTarget(event, 'COPY') }}>
                            <div className="action-btn-content flex align-center" >
                                <CopyIcon />
                                <span>Copy</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={toggleIsArchive}>
                            <div className="action-btn-content flex align-center" >
                                {isArchive ? <ArrowBackIcon /> : <ArchiveIcon />}
                                <span>{isArchive ? 'Return to board' : 'Archive'}</span>
                            </div>
                        </button>
                        {/* <button className="secondary-btn action-btn" onClick={toggleIsArchive}>
                            <div className="action-btn-content flex align-center" >
                                {isArchive ? <ArrowBackIcon /> : <ArchiveIcon />}
                                <span>{isArchive ? 'Return to board' : 'Archive'}</span>
                            </div>
                        </button> */}
                    </div>
                </div>

            </aside>
        )
    }
}
