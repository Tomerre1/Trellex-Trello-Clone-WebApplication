import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Close } from "@mui/icons-material";
import { loadBoard } from "../../store/board.actions";
import { BarChart } from "./BarChart";
import { DoughnutChart } from "./DoughnutChart";
import { ActivityChart } from "./ActivityChart";
import { LoaderSpinner } from "../LoaderSpinner";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";

export function _Dashboard(props) {
  const onBack = () => {
    props.history.goBack();
  };

  useEffect(() => {
    if (!props?.board) {
      const { boardId } = props.match.params;
      props.loadBoard(boardId);
    }
  }, [props]);
  const { board } = props;

  const getTaskDetails = () => {
    if (!props.board) return;
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
        if (activity.byMember) {
          membersActivity[activity.byMember?.fullname] = membersActivity[
            activity.byMember.fullname
          ]
            ? membersActivity[activity.byMember.fullname] + 1
            : 1;
        }
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
    const sortedActivity = Object.entries(membersActivity).sort(
      (a, b) => b[1] - a[1]
    );
    const sortedNames = sortedActivity.map(activity => activity[0])
    const sortedAmount = sortedActivity.map(activity => activity[1])
    console.log(sortedActivity);
    return {
      tasks,
      archivedTasks,
      overDueTasks,
      doneTasks,
      checklists,
      doneChecklists,
      todos,
      doneTodos,
      sortedNames,
      sortedAmount
    };
  };

  const taskDetails = getTaskDetails(props);
  if (!props.board)
    return (
      <section className="dashboard-overlay flex column ">
        <LoaderSpinner />
      </section>
    );
  return (
    <section className="dashboard-overlay flex column fade-in">
      <button onClick={onBack} className="close-btn clean-btn">
        <Close />
      </button>
      <div className="dashboard-container flex column ">
        <div className="header flex column justify-center align-center">
          <h1 className="dash-title">{board.title}</h1>
          <p className="date">
            Created at {new Date(board.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="info-container flex align-center">
          <div className="info-box flex">
            <div className="flex column big-num-box">
              <p className="info-num">{board.members?.length}</p>
              <p className="below-num">Members</p>
            </div>
            <div className="flex column details">
              <PeopleIcon className="icon" />
            </div>
          </div>
          <div className="info-box flex">
            <div className="flex column big-num-box">
              <p className="info-num">{taskDetails.tasks}</p>
              <p className="below-num">Tasks</p>
            </div>
            <div className="flex column details">
              <p className="green">{taskDetails.doneTasks} Completed</p>
              <p className="red">{taskDetails.overDueTasks} Overdue </p>
              <p className="yellow">{taskDetails.archivedTasks} Archived </p>
            </div>
          </div>
          <div className="info-box flex">
            <div className="flex column big-num-box">
              <p className="info-num">{taskDetails.checklists}</p>
              <p className="below-num">{`Checklist${
                taskDetails.checklists !== 1 ? "s" : ""
              }`}</p>
            </div>
            <div className="flex column details">
              <p className="green">{taskDetails.doneChecklists} Completed</p>
              <p className="yellow">{taskDetails.todos} Todos </p>
              <p className="red">
                {taskDetails.todos - taskDetails.doneTodos} Open todos
              </p>
            </div>
          </div>
        </div>
        <div className="chart-container flex ">
          <div className="chart flex align-center">
            <DoughnutChart board={board} />
          </div>
          <div className="chart flex align-center">
            <ActivityChart taskDetails={taskDetails} />
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
const mapDispatchToProps = {
  loadBoard,
};
export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Dashboard);
