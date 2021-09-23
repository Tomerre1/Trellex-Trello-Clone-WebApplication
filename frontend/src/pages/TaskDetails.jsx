import React, { Component } from "react";
import { Close } from '@mui/icons-material';
import { TaskHeader } from '../cmps/TaskHeader';
import { TaskCardCover } from '../cmps/TaskCardCover'
import { TaskDescription } from '../cmps/TaskDescription'
import { Popover } from '../cmps/Popover'
import { TaskActionsMenu } from '../cmps/TaskActionsMenu'
export class TaskDetails extends Component {
  state = { isCover: true, currentTarget: null, isPopover: false }
  contentEl = null;
  setCurrentTarget = (event) => {
    this.setState(prevState => ({ ...prevState, currentTarget: event.target.getBoundingClientRect() }))
  };
  togglePopover = () => {
    this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
  }


  render() {
    const { isCover, currentTarget, isPopover } = this.state

    return (
      <section className="task-details flex column">
        <button className={`close-task-details ${isCover ? 'cover' : ''}`}><Close /></button>
        <TaskCardCover />
        <TaskHeader />
        <div className="task-details-body flex">
          <TaskDescription />
          <TaskActionsMenu setCurrentTarget={this.setCurrentTarget} togglePopover={this.togglePopover} />

        </div>

        {isPopover && currentTarget && <Popover togglePopover={this.togglePopover} currentTarget={currentTarget}></Popover>}
      </section >

    );
  }
}
