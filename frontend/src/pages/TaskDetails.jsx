import React, { Component } from "react";
import { connect } from "react-redux";
import { Close } from "@mui/icons-material";
import { TaskHeader } from "../cmps/TaskHeader";
import { TaskCardCover } from "../cmps/TaskCardCover";
import { TaskDescription } from "../cmps/TaskDescription";
import { TaskAttachment } from "../cmps/TaskAttachment";
import { TaskChecklist } from "../cmps/TaskChecklist";
import { TaskActivities } from "../cmps/TaskActivities";
import { TaskActionsMenu } from "../cmps/TaskActionsMenu";
import { TaskHeaderDetails } from "../cmps/TaskHeaderDetails";
import { saveBoard, saveTaskDetails, addActivity, loadBoard } from "../store/board.actions";
import { setCurrTaskDetails, setPopover, setPosition, setPopoverMenu } from '../store/app.actions'

export class _TaskDetails extends Component {
  state = {
    currTask: null,
    currGroup: null
  };
  contentEl = null;

  componentDidMount = async () => {
    const { boardId, taskId, listId } = this.props.match.params;
    const { board, setCurrTaskDetails, setPopoverMenu } = this.props;
    if (!board) await this.props.loadBoard(boardId)
    const currGroup = this.props.board?.groups.find((list) => list.id === listId);
    const currTask = currGroup?.tasks.find((task) => task.id === taskId);
    setCurrTaskDetails(currTask)
    setPopoverMenu(false)
    this.setState((prevState) => ({
      ...prevState,
      currGroup,
      currTask,
    }));
  }

  componentWillUnmount() {
    this.props.setCurrTaskDetails(null)
    this.props.setPosition({ pageX: null, pageY: null, type: null })
    this.props.setPopover(false)
  }

  updateTaskDetails = async (currTask) => {
    const { currGroup } = this.state;
    const { board, saveTaskDetails } = this.props;
    await saveTaskDetails(board, currGroup, currTask);
  };

  toggleOverlay = () => {
    this.props.history.goBack();
  };

  setTaksDetailsTitle = (title) => {
    const { currTaskDetails, setCurrTaskDetails } = this.props;
    currTaskDetails.title = title;
    setCurrTaskDetails(currTaskDetails)
    this.updateTaskDetails(currTaskDetails);
  };

  joinTask = async () => {
    const { board, currTaskDetails, loggedinUser, addActivity, setCurrTaskDetails } = this.props;
    let { members } = currTaskDetails;
    members = members || [];
    const boardMemberIds = board.members.map(member => member._id)
    if (!loggedinUser) return
    if (!boardMemberIds.includes(loggedinUser._id)) {
      board.members.push(loggedinUser)
    }
    const selectedMembersIds = members.map((member) => member._id);
    if (!selectedMembersIds.includes(loggedinUser._id)) {
      members.push(loggedinUser);
    }
    currTaskDetails.members = members;
    setCurrTaskDetails(currTaskDetails)
    this.updateTaskDetails(currTaskDetails);
    await addActivity(board, currTaskDetails, 'add-self')
  };

  deleteTask = async () => {
    const { board, currTaskDetails, saveBoard, addActivity } = this.props;
    const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
    const currGroupIdx = board.groups.indexOf(currGroup)
    currGroup.tasks = currGroup.tasks.filter((task) => task.id !== currTaskDetails.id);
    board.groups[currGroupIdx] = currGroup
    await saveBoard(board);
    this.props.history.goBack();
    await addActivity(board, currTaskDetails, 'remove-task')
  }

  toggleIsArchive = async () => {
    const { board, currTaskDetails, addActivity, setCurrTaskDetails } = this.props;
    currTaskDetails.isArchive = currTaskDetails?.isArchive || false
    currTaskDetails.isArchive = !currTaskDetails.isArchive;
    setCurrTaskDetails(currTaskDetails);
    (currTaskDetails.isArchive) ? await addActivity(board, currTaskDetails, 'add-to-archive') : await addActivity(board, currTaskDetails, 'remove-from-archive')
    this.updateTaskDetails(currTaskDetails);
  }

  render() {
    const { currGroup } = this.state;
    const { board, currTaskDetails, loggedinUser } = this.props;
    if (!currTaskDetails || !board || !currGroup) return <></>;
    const { style } = currTaskDetails;
    currTaskDetails.style = (style) ? style : { bgColor: null, bgUrl: null }
    const { bgColor, bgUrl } = currTaskDetails.style
    const { isArchive } = currTaskDetails
    const taskOverlay = {
      position: "fixed",
      inset: 0,
      height: "100vh",
      overflowY: "auto",
      zIndex: 90,
    };

    return (
      <div style={taskOverlay}>
        <div
          className="overlay show"
          onClick={() => this.props.history.push(`/board/${board._id}`)}>
        </div>

        <section className="task-details flex column">
          <button
            onClick={() => this.props.history.push(`/board/${board._id}`)}
            className={`close-task-details ${bgColor ? "cover" : ""}`}>
            <Close />
          </button>
          {(bgColor || bgUrl) && (<TaskCardCover />)}

          {isArchive &&
            <div className="task-details-archived flex">
              <i className="fas fa-archive icon-sm"></i>
              <h3>This card is archived.</h3>
            </div>
          }

          <TaskHeader
            taskTitle={currTaskDetails.title}
            setTaksDetailsTitle={this.setTaksDetailsTitle}
            taskList={board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))?.title || ''}
          />
          <div className="task-details-body flex">
            <div className="task-details-main flex column">

              <TaskHeaderDetails
                toggleTaskDone={this.toggleTaskDone}
              />

              <TaskDescription
                currTask={currTaskDetails}
                updateTaskDetails={this.updateTaskDetails}
              />
              <TaskAttachment />
              <TaskChecklist />
              <TaskActivities
                currTask={currTaskDetails}
                loggedinUser={loggedinUser}
                activities={board.activities}
                updateTaskDetails={this.updateTaskDetails}
              />
            </div>
            <TaskActionsMenu
              joinTask={this.joinTask}
              deleteTask={this.deleteTask}
              toggleIsArchive={this.toggleIsArchive}
              isArchive={isArchive}
            />
          </div>

        </section>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    loggedinUser: state.userModule.loggedinUser,
    currTaskDetails: state.appModule.currTaskDetails
  };
}
const mapDispatchToProps = {
  saveBoard,
  saveTaskDetails,
  setCurrTaskDetails,
  setPopover,
  setPosition,
  setPopoverMenu,
  addActivity,
  loadBoard
};

export const TaskDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskDetails);
