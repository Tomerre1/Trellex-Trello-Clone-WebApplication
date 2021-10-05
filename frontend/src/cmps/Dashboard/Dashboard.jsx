import React from "react";
import { connect } from "react-redux";
import { Close } from "@mui/icons-material";

import { BarChart } from "./BarChart";
import { DoughnutChart } from "./DoughnutChart";
import { TodoChart } from "./TodoChart";

export function _Dashboard(props) {
  const onBack = () => {
    props.history.goBack();
  };

  const { board } = props;

  const getTaskDetails = () => {
    let tasks = 0;
    let archivedTasks = 0;
    let overDueTasks = 0;
    let doneTasks = 0;
    if (board.groups.length) {
      board.groups.forEach((group) => {
        group?.tasks.forEach((task) => {
          task.isArchive ? (archivedTasks += 1) : (tasks += 1);
          doneTasks += task?.isDone ? 1 : 0;
          overDueTasks += task?.dueDate < Date.now() && task.isDone ? 1 : 0;
        });
      });
    }
    return {tasks,archivedTasks,overDueTasks,doneTasks};
  };

  const taskDetails = getTaskDetails();

  return (
    <section className="dashboard-overlay flex column">
      <button onClick={onBack} class="close-btn clean-btn">
        <Close />
      </button>
      <div className="dashboard-container flex column">
        <h1 className="dash-title">{board.title} Dashboard</h1>
        <div className="info-container flex align-center">
          <div className="info-box flex column align-center">
            <p>Total Members</p>
            <p>{board.members?.length}</p>
          </div>
          <div className="info-box flex column align-center">
            <p>Total Tasks</p>
            <p>{taskDetails.tasks}</p>
          </div>
          <div className="info-box flex column align-center">
            <p>Tasks in Archive</p>
            <p>{taskDetails.archivedTasks}</p>
          </div>
          <div className="info-box flex column align-center">
            <p>Tasks in Archive</p>
            <p>{taskDetails.archivedTasks}</p>
          </div>
          <div className="info-box flex column align-center">
            <p>Overdue Tasks</p>
            <p>{taskDetails.overDueTasks}</p>
          </div>
          <div className="info-box flex column align-center">
            <p>Completed Tasks</p>
            <p>{taskDetails.doneTasks}</p>
          </div>
        </div>
        <div className="chart-container flex ">
          <div className="chart flex align-center">
            <DoughnutChart board={board} />
          </div>
          <div className="chart flex align-center">
            <TodoChart board={{ ...board }} />
          </div>
          <div className="chart flex align-center">
            <BarChart board={props.board} />
          </div>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

export const Dashboard = connect(mapStateToProps, null)(_Dashboard);
