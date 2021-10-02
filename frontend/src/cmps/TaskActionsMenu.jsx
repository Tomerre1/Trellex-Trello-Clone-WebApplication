import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import RemoveIcon from '@mui/icons-material/Remove';
import { setPosition } from '../store/app.actions';
export class _TaskActionsMenu extends Component {
    render() {
        const { setCurrentTarget, joinTask, toggleIsArchive, deleteTask, isArchive, currTaskDetails, loggedinUser } = this.props
        const loggedinUserIsJoin = currTaskDetails.members?.find((member) => member._id === loggedinUser._id) ? true : false || false
        return (
            <aside className="task-details-sidebar flex column full">
                <div className="actions-wrapper flex">
                    {!loggedinUserIsJoin && <div className="suggested flex column">
                        <h4>SUGGESTED</h4>
                        <button className="secondary-btn action-btn" onClick={joinTask}>
                            <div className="action-btn-content flex" >
                                <PersonOutlineIcon />
                                <span>Join</span>
                            </div>
                        </button>
                    </div>}
                    <div className="add-to-card flex column">
                        <h4>ADD TO CARD</h4>

                        <button className="secondary-btn action-btn" onClick={(event) => { this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'MEMBERS' }) }}>
                            <div className=" action-btn-content flex" >
                                <PersonAddAltIcon />
                                <span>Members</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'LABELS' }) }}>
                            <div className="action-btn-content flex " >
                                <LabelIcon />
                                <span>Labels</span>
                            </div>
                        </button>

                        <button className="secondary-btn action-btn" onClick={(event) => { this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'CHECKLIST' }) }}>
                            <div className="action-btn-content flex " >
                                <CheckboxIcon />
                                <span>Checklist</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'DATE' }) }}>
                            <div className=" action-btn-content flex " >
                                <ScheduleIcon />
                                <span>Date</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { setCurrentTarget(event, 'ATTACHMENT') }}>
                            <div className="action-btn-content flex " >
                                <AttachFileIcon />
                                <span>Attachment</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'COVER' }) }}>
                            <div className=" action-btn-content flex " >
                                <CoverIcon />
                                <span>Cover</span>
                            </div>
                        </button>
                    </div>
                    <div className="actions flex column">
                        <h4>ACTIONS</h4>
                        <button className="secondary-btn action-btn" onClick={(event) => { this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'MOVE' }) }}>
                            <div className="action-btn-content flex " >
                                <ArrowForwardIcon />
                                <span>Move</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={(event) => { this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'COPY' }) }}>
                            <div className="action-btn-content flex " >
                                <CopyIcon />
                                <span>Copy</span>
                            </div>
                        </button>
                        <button className="secondary-btn action-btn" onClick={toggleIsArchive}>
                            <div className="action-btn-content flex " >
                                {isArchive ? <ArrowBackIcon /> : <ArchiveIcon />}
                                <span>{isArchive ? 'Return to board' : 'Archive'}</span>
                            </div>
                        </button>
                        {isArchive &&
                            <button className="secondary-btn action-btn danger-btn" style={{ color: '#fff' }} onClick={deleteTask}>
                                <div className="action-btn-content flex " >
                                    <RemoveIcon style={{ color: '#fff' }} />
                                    <span>Delete</span>
                                </div>
                            </button>
                        }
                    </div>
                </div>

            </aside>
        )
    }
}
function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        loggedinUser: state.userModule.loggedinUser,
    };
}
const mapDispatchToProps = {
    setPosition,
};

export const TaskActionsMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TaskActionsMenu);
