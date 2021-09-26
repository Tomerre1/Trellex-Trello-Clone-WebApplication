import React, { Component } from "react";
import { connect } from "react-redux";
import { Close } from '@mui/icons-material';
import { TaskHeader } from '../cmps/TaskHeader';
import { TaskCardCover } from '../cmps/TaskCardCover'
import { TaskDescription } from '../cmps/TaskDescription'
import { TaskChecklist } from '../cmps/TaskChecklist'
import { TaskActivities } from '../cmps/TaskActivities'
import { TaskActionsMenu } from '../cmps/TaskActionsMenu'
import { PopoverLabels } from "../cmps/Popover/PopoverLabels";
import { PopoverMembers } from "../cmps/Popover/PopoverMembers";
import { PopoverChecklist } from '../cmps/Popover/PopoverChecklist'
import { PopoverDate } from "../cmps/Popover/PopoverDate";
import { PopoverAttachment } from '../cmps/Popover/PopoverAttachment';
import { PopoverCover } from '../cmps/Popover/PopoverCover';
import { LoaderSpinner } from '../cmps/LoaderSpinner'
import { saveBoard, saveTaskDetails } from '../store/board.actions'
import { setCurrTaskDetails } from '../store/app.actions'

export class _TaskDetails extends Component {
  state = {
    isCover: true,
    currentTarget: null,
    isPopover: false,
  }
  contentEl = null;

  componentDidMount() {
    const { board } = this.props
    const { taskId, listId } = this.props.match.params;
    const currGroup = board.groups.find(list => list.id === listId)
    const currTask = currGroup.tasks.find(task => task.id === taskId)
    this.setState({ isCover: false, isPopover: false, currGroup, currTask, currentTarget: null })
    // this.props.setCurrTaskDetails({ currTask, currGroup })
  }

  updateBoard = async (board) => {
    await this.props.saveBoard(board)
  }

  updateTaskDetails = async (currTask) => {
    const { currGroup } = this.state
    const { board, saveTaskDetails } = this.props
    await saveTaskDetails(board, currGroup, currTask)
  }

  setCurrentTarget = (event, type) => {
    this.setState(prevState => ({ ...prevState, type, currentTarget: event.target.getBoundingClientRect() }))
    this.togglePopover()
  };

  togglePopover = () => {
    this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
  }

  render() {
    const { isCover, currentTarget, isPopover, type, currTask, currGroup } = this.state
    const { board } = this.props
    if (!currTask || !board) return <LoaderSpinner />
    const DynamicCmpPopover = (props) => {
      switch (props.type) {
        case 'LABELS':
          return <PopoverLabels {...props} board={board} currGroup={currGroup} title='Labels' />
        case 'MEMBERS':
          return <PopoverMembers {...props} title='Members' />
        case 'CHECKLIST':
          return <PopoverChecklist {...props} title='Checklist' />
        case 'DATE':
          return <PopoverDate {...props} title='Date' />
        case 'ATTACHMENT':
          return <PopoverAttachment {...props} title='Attach from...' />
        case 'COVER':
          return <PopoverCover {...props} title='Cover' />
      }
    }

    return (
      <section className="task-details flex column">
        <button className={`close-task-details ${isCover ? 'cover' : ''}`}><Close /></button>
        <TaskCardCover bgColor={currTask.style.bgColor} />
        <TaskHeader />
        <div className="task-details-body flex">
          <div className="task-details-main flex column">
            <TaskDescription currTask={currTask} />
            <TaskChecklist currTask={currTask} updateTaskDetails={this.updateTaskDetails}/>
            <TaskActivities />
          </div>
          <TaskActionsMenu setCurrentTarget={this.setCurrentTarget} togglePopover={this.togglePopover} />
        </div>

        {isPopover &&
          <DynamicCmpPopover
            togglePopover={this.togglePopover}
            currentTarget={currentTarget}
            updateBoard={this.updateBoard}
            updateTaskDetails={this.updateTaskDetails}
            type={type}
            currTask={currTask}
          />
        }
      </section >

    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    // currTaskDetails: state.appModule.currTaskDetails
  };
}
const mapDispatchToProps = {
  saveBoard,
  // setCurrTaskDetails,
  saveTaskDetails
};

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails);
