import React, { Component } from "react";
import { connect } from "react-redux";

import { Close } from '@mui/icons-material';
import { TaskHeader } from '../cmps/TaskHeader';
import { TaskCardCover } from '../cmps/TaskCardCover'
import { TaskDescription } from '../cmps/TaskDescription'
import { TaskActivities } from '../cmps/TaskActivities'
import { TaskActionsMenu } from '../cmps/TaskActionsMenu'
import { PopoverLabels } from "../cmps/Popover/PopoverLabels";
import { PopoverMembers } from "../cmps/Popover/PopoverMembers";
import { PopoverChecklist } from '../cmps/Popover/PopoverChecklist'
import { PopoverDate } from "../cmps/Popover/PopoverDate";
import { PopoverAttachment } from '../cmps/Popover/PopoverAttachment';
import { PopoverCover } from '../cmps/Popover/PopoverCover';
import { boardService } from '../services/board.service'
export class _TaskDetails extends Component {
  state = {
    isCover: true,
    currentTarget: null,
    isPopover: false,
    currTask: null
  }
  contentEl = null;

  //http://localhost:3000/board/b101/g101/c103
  async componentDidMount() {
    const board = await boardService.getById('b101') // no redux yet
    const { taskId, listId } = this.props.match.params;
    const currList = board.groups.find(list => list.id === listId)
    const currTask = currList.tasks.find(task => task.id === taskId)
    this.setState({ isCover: false, currTask, isPopover: false, currentTarget: null })
  }

  setCurrentTarget = (event, type) => {
    this.setState(prevState => ({ ...prevState, type, currentTarget: event.target.getBoundingClientRect() }))
    this.togglePopover()
  };
  togglePopover = () => {
    this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
  }


  render() {
    const { isCover, currentTarget, isPopover, labels, type } = this.state
    const { board } = this.props
    const DynamicCmpPopover = (props) => {
      switch (props.type) {
        case 'LABELS':
          return <PopoverLabels {...props} labels={labels} title='Labels' />
        case 'MEMBERS':
          return <PopoverMembers {...props} members={1, 2, 3} title='Members' />
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
        <TaskCardCover />
        <TaskHeader />
        <div className="task-details-body flex">
          <div className="task-details-main flex column">
            <TaskDescription />
            <TaskActivities />
          </div>

          <TaskActionsMenu setCurrentTarget={this.setCurrentTarget} togglePopover={this.togglePopover} />
        </div>

        {isPopover && currentTarget && type && <DynamicCmpPopover togglePopover={this.togglePopover} currentTarget={currentTarget} type={type} />}
      </section >

    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}
const mapDispatchToProps = {

};

export const TaskDetails = connect(mapStateToProps, null)(_TaskDetails);
