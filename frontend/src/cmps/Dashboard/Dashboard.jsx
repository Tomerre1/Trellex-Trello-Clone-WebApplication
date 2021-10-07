import React from "react";
import { connect } from "react-redux";
import { Close } from "@mui/icons-material";

import { BarChart } from "./BarChart";
import { DoughnutChart } from "./DoughnutChart";
import { ActivityChart } from "./ActivityChart";

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
    let checklists = 0;
    let doneChecklists = 0;
    let todos = 0;
    let doneTodos = 0;
    let membersActivity = {};

    if (board.groups.length) {
      board?.activities.forEach((activity) => {
        membersActivity[activity.byMember.fullname] = membersActivity[
          activity.byMember.fullname
        ]
          ? membersActivity[activity.byMember.fullname] + 1
          : 1;
      });
      board.groups.forEach((group) => {
        group?.tasks.forEach((task) => {
          if (task.checklists) {
            checklists += task.checklists.length;
            task.checklists.forEach((checklist) => {
              let inTodos = checklist.todos.length;
              let inDoneTodos = 0;
              todos += checklist.todos.length;
              checklist.todos.forEach((todo) => {
                if (todo.isDone) {
                  doneTodos++;
                  inDoneTodos++;
                }
              });
              if (inTodos === inDoneTodos) doneChecklists++;
            });
          }
          task.isArchive ? (archivedTasks += 1) : (tasks += 1);
          doneTasks += task?.isDone ? 1 : 0;
          overDueTasks += task?.dueDate < Date.now() && !task.isDone ? 1 : 0;
        });
      });
    }
    return {
      tasks,
      archivedTasks,
      overDueTasks,
      doneTasks,
      checklists,
      doneChecklists,
      todos,
      doneTodos,
      membersActivity,
    };
  };

  const taskDetails = getTaskDetails();

  return (
    <section className="dashboard-overlay flex column">
      <button onClick={onBack} class="close-btn clean-btn">
        <Close />
      </button>
      <div className="dashboard-container flex column">
        <div className="header flex column justify-center align-center">
          <h1 className="dash-title">{board.title}</h1>
          <p className="date">
            Created at {new Date(board.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="info-container flex align-center">
          <div className="info-box flex column ">
            <p className="info-num">{board.members?.length}</p>
            <p>Total Members</p>
          </div>
          <div className="info-box flex column align-center">
            <p className="info-num">{taskDetails.tasks}</p>
            <p>Total Tasks</p>
          </div>
          <div className="info-box flex column align-center">
            <p className="info-num">{taskDetails.archivedTasks}</p>
            <p>{`Task${
              taskDetails.archivedTasks !== 1 ? "s" : ""
            } in Archive`}</p>
          </div>
          <div className="info-box flex column align-center">
            <p className="info-num">{taskDetails.overDueTasks}</p>
            <p>{`Overdue Task${taskDetails.overDueTasks !== 1 ? "s" : ""}`}</p>
          </div>
          <div className="info-box flex column align-center">
            <p className="info-num">{taskDetails.doneTasks}</p>
            <p>{`Completed Task${taskDetails.doneTasks !== 1 ? "s" : ""}`}</p>
          </div>
          <div className="info-box flex column align-center">
            <p className="info-num">{taskDetails.checklists}</p>
            <p>{`Checklist${taskDetails.checklists !== 1 ? "s" : ""}`}</p>
          </div>
          <div className="info-box flex column align-center">
            <p className="info-num">{taskDetails.doneTasks}</p>
            <p>{`Completed Checklist${
              taskDetails.doneChecklists !== 1 ? "s" : ""
            }`}</p>
          </div>
          <div className="info-box flex column align-center">
            <p className="info-num">{taskDetails.todos}</p>
            <p>{`Todo${taskDetails.todos !== 1 ? "s" : ""}`}</p>
          </div>
          <div className="info-box flex column align-center">
            <p className="info-num">{taskDetails.doneTodos}</p>
            <p>{`Done Todo${taskDetails.doneTodos !== 1 ? "s" : ""}`}</p>
          </div>
        </div>
        <div className="chart-container flex ">
          <div className="chart flex align-center">
            <DoughnutChart board={board} />
          </div>
          <div className="chart flex align-center">
            <ActivityChart membersActivity={taskDetails.membersActivity} />
          </div>
          <div className="chart flex align-center">
            <BarChart board={board} />
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
