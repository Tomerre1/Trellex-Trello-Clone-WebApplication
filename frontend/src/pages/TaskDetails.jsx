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
import { TaskHeaderDetails } from '../cmps/TaskHeaderDetails'
import { LoaderSpinner } from '../cmps/LoaderSpinner'
import { saveBoard, saveTaskDetails } from '../store/board.actions'

export class _TaskDetails extends Component {
  state = {
    currentTarget: null,
    isPopover: false,
    bgColorCover: null,
    selectedMembers: null,
    selectedLabels: [],
    selectedDate: null,
  }
  contentEl = null;

  componentDidMount() {
    const { board } = this.props
    const { taskId, listId } = this.props.match.params;
    const currGroup = board.groups.find(list => list.id === listId)
    const currTask = currGroup.tasks.find(task => task.id === taskId)
    this.setState(prevState => ({
      ...prevState,
      bgColorCover: currTask.style?.bgColor || null,
      isPopover: false,
      currGroup,
      currTask,
      currentTarget: null,
      selectedLabels: board.labels.filter(label => currTask.labelIds.includes(label.id))
    }))
  }

  updateBoard = async (board) => {
    await this.props.saveBoard(board)
  }

  updateTaskDetails = async (currTask) => {
    const { currGroup } = this.state
    const { board, saveTaskDetails } = this.props
    await saveTaskDetails(board, currGroup, currTask)
  }

  toggleOverlay = () => {

    this.props.history.goBack()
  }

  setCurrentTarget = (event, type) => {
    this.setState(prevState => ({ ...prevState, type, currentTarget: event.target.getBoundingClientRect() }))
    this.togglePopover()
  };

  togglePopover = () => {
    this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
  }

  setBgColorCover = (bgColor) => {
    this.setState(prevState => ({ ...prevState, bgColorCover: bgColor }))
  }

  setSelectedLabels = (selectedLabelIds) => {
    const { board } = this.props
    let labelsSelectedDeep = board.labels.filter(label => selectedLabelIds.includes(label.id));
    this.setState(prevState => ({
      ...prevState,
      selectedLabels: labelsSelectedDeep,
    }))
  }

  setSelectedMembers = (selectedMembers) => {
    this.setState(prevState => ({
      ...prevState,
      selectedMembers: selectedMembers,
    }))
  }

  setTaksDetailsTitle = (title) => {
    const { currTask } = this.state
    currTask.title = title
    this.updateTaskDetails({ ...currTask, title })
  }



  render() {
    const { currentTarget, isPopover, type, selectedLabels, selectedDate, selectedMembers, currTask, currGroup, bgColorCover, isOverlay } = this.state
    const { board } = this.props
    if (!currTask || !board) return <LoaderSpinner />
    const DynamicCmpPopover = (props) => {
      switch (props.type) {
        case 'LABELS':
          return <PopoverLabels {...props} board={board} currGroup={currGroup} setSelectedLabels={this.setSelectedLabels} title='Labels' />
        case 'MEMBERS':
          return <PopoverMembers {...props} title='Members' setSelectedMembers={this.setSelectedMembers} members={board.members} />
        case 'CHECKLIST':
          return <PopoverChecklist {...props} title='Checklist' />
        case 'DATE':
          return <PopoverDate {...props} title='Date' />
        case 'ATTACHMENT':
          return <PopoverAttachment {...props} title='Attach from...' />
        case 'COVER':
          return <PopoverCover {...props} setBgColorCover={this.setBgColorCover} setIsCover={this.setIsCover} title='Cover' />
      }
    }

    return (
      <>
        <section className="task-details flex column">
          <button onClick={this.props.history.goBack} className={`close-task-details ${bgColorCover ? 'cover' : ''}`}><Close /></button>
          {bgColorCover && <TaskCardCover bgColor={bgColorCover} />}

          <TaskHeader taskTitle={currTask.title} setTaksDetailsTitle={this.setTaksDetailsTitle} />
          <div className="task-details-body flex">
            <div className="task-details-main flex column">
              {(selectedLabels || selectedMembers || selectedDate) &&
                <TaskHeaderDetails
                  selectedLabels={selectedLabels}
                  selectedMembers={currTask.members}
                // selectedDate={selectedDate}
                />
              }
              <TaskDescription currTask={currTask} />
              <TaskChecklist currTask={currTask} updateTaskDetails={this.updateTaskDetails} />
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
        <div className='overlay show' onClick={this.props.history.goBack} ></div>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}
const mapDispatchToProps = {
  saveBoard,
  saveTaskDetails
};

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails);
