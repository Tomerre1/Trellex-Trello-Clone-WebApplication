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
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import { boardService } from '../services/board.service'
import { saveBoard, saveTaskDetails } from "../store/board.actions";
import { setCurrTaskDetails, setPopover, setPosition, setPopoverMenu } from '../store/app.actions'

export class _TaskDetails extends Component {
  state = {
    currTask: null,
    currGroup: null
  };
  contentEl = null;

  componentDidMount() {
    const { board, setCurrTaskDetails, setPopoverMenu } = this.props;
    const { taskId, listId } = this.props.match.params;
    const currGroup = board.groups.find((list) => list.id === listId);
    const currTask = currGroup.tasks.find((task) => task.id === taskId);
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

  setTaksDetailsTitle = async (title) => {
    const { currTaskDetails, board, saveTaskDetails } = this.props;
    const { currGroup } = this.state;
    currTaskDetails.title = title;
    await saveTaskDetails(board, currGroup, currTaskDetails)
  };

  joinTask = () => {
    const { loggedinUser, currTaskDetails } = this.props;
    let { members } = currTaskDetails;
    members = members || [];
    const selectedMembersIds = members.map((member) => member._id);
    // const selectedMembersIds = members.map((member) => member._id) || [];
    if (!selectedMembersIds.includes(loggedinUser._id)) {
      members.push(loggedinUser);
    }
    currTaskDetails.members = members;
    this.addActivity('add-self')
    this.updateTaskDetails(currTaskDetails);
  };

  deleteTask = async () => {
    const { currGroup } = this.state;
    const { currTaskDetails, saveBoard } = this.props;
    const { board } = this.props
    const currGroupIdx = board.groups.indexOf(currGroup)
    currGroup.tasks = currGroup.tasks.filter((task) => task.id !== currTaskDetails.id);
    board.groups[currGroupIdx] = currGroup
    this.addActivity('remove-task')
    await saveBoard(board);
    this.props.history.goBack();
  }

  toggleIsArchive = () => {
    const { currTaskDetails } = this.props;
    currTaskDetails.isArchive = currTaskDetails?.isArchive || false
    currTaskDetails.isArchive = !currTaskDetails.isArchive;
    this.addActivity((currTaskDetails.isArchive) ? 'add-to-archive' : 'remove-from-archive')
    this.updateTaskDetails(currTaskDetails);
  }

  addActivity = async (activityType, txt = null) => {
    const { board, currTaskDetails, saveBoard } = this.props;
    board.activities.push(boardService.createActivity(activityType, currTaskDetails, txt))
    await saveBoard(board);
  }

  render() {
    const { currGroup } = this.state;
    const { board, currTaskDetails } = this.props;
    if (!currTaskDetails || !board || !currGroup) return <LoaderSpinner />;

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
              <i class="fas fa-archive icon-sm"></i>
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
                addActivity={this.addActivity}
              />

              <TaskDescription
                currTask={currTaskDetails}
                updateTaskDetails={this.updateTaskDetails}
              />
              <TaskAttachment
                // currTask={currTaskDetails}
                updateTaskDetails={this.updateTaskDetails}
                addActivity={this.addActivity}
                setBgUrlCover={this.setBgUrlCover}
              />
              <TaskChecklist
              // currTask={currTask}
              // updateTaskDetails={this.updateTaskDetails}
              // addActivity={this.addActivity}
              />
              {/* <TaskActivities
                currTask={currTask}
                loggedinUser={loggedinUser}
                activities={board.activities}
                updateTaskDetails={this.updateTaskDetails}
              /> */}
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
  setPopoverMenu
};

export const TaskDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskDetails);
