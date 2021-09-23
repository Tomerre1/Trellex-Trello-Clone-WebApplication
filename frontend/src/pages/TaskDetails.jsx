import React, { Component } from "react";
import { Close } from '@mui/icons-material';
import { TaskHeader } from '../cmps/TaskHeader';
import { TaskCardCover } from '../cmps/TaskCardCover'
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
          <TaskActionsMenu />

        </div>

        {/* <button
          onClick={(event) => { this.setCurrentTarget(event); this.togglePopover() }}>click</button> */}
        <button
          onClick={(event) => { this.setCurrentTarget(event); this.togglePopover() }}>click</button>

        {isPopover && <Popover togglePopover={this.togglePopover} currentTarget={currentTarget}></Popover>}
      </section >

    );
  }
}
