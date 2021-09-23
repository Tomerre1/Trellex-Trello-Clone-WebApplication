import React, { Component } from "react";
import { Close } from '@mui/icons-material';
import { TaskHeader } from '../cmps/TaskHeader';
import { TaskCardCover } from '../cmps/TaskCardCover'
export class TaskDetails extends Component {
  state = { isCover: true }
  render() {
    const { isCover } = this.state
    return (
      <section className="task-details flex column">
        <button className={`close-task-details ${isCover ? 'cover' : ''}`}><Close /></button>
        <TaskCardCover />
        <TaskHeader />
      </section>
    );
  }
}
