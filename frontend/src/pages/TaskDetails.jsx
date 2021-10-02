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
import { PopoverDynamicCmp } from '../cmps/Popover/PopoverDynamicCmp'
import { saveBoard, saveTaskDetails } from "../store/board.actions";
import { setCurrTaskDetails } from '../store/app.actions'

export class _TaskDetails extends Component {
  state = {
    currentTarget: null,
    isPopover: false,
    bgColorCover: null,
    selectedMembers: null,
    selectedLabels: [],
    selectedDate: null,
    loggedinUserIsJoin: null,
  };
  contentEl = null;

  componentDidMount() {
    const { board, loggedinUser, setCurrTaskDetails } = this.props;
    const { taskId, listId } = this.props.match.params;
    const currGroup = board.groups.find((list) => list.id === listId);
    const currTask = currGroup.tasks.find((task) => task.id === taskId);
    setCurrTaskDetails(currTask)
    this.setState((prevState) => ({
      ...prevState,
      bgColorCover: currTask.style?.bgColor || null,
      bgUrlCover: currTask.style?.bgUrl || null,
      isPopover: false,
      currGroup,
      currTask,
      currentTarget: null,
      selectedMembers: currTask.members,
      selectedLabels: board.labels.filter((label) => currTask.labelIds.includes(label.id)),
      loggedinUserIsJoin: currTask.members?.find((member) => member._id === loggedinUser._id) ? true : false || false,
    }));
  }

  updateBoard = async (board) => {
    await this.props.saveBoard(board);
  };

  updateBoards = async (boards) => {
    await this.props.saveBoards(boards);
  };

  updateTaskDetails = async (currTask) => {
    const { currGroup } = this.state;
    const { board, saveTaskDetails } = this.props;
    await saveTaskDetails(board, currGroup, currTask);
  };

  toggleOverlay = () => {
    this.props.history.goBack();
  };

  setCurrentTarget = (event, type) => {
    this.setState((prevState) => ({
      ...prevState,
      type,
      currentTarget: event,
    }));
    this.togglePopover();
  };

  togglePopover = () => {
    this.setState((prevState) => ({
      ...prevState,
      isPopover: !prevState.isPopover,
    }));
  };

  setBgColorCover = (bgColor) => {
    this.setState((prevState) => ({ ...prevState, bgColorCover: bgColor }));
  };


  setSelectedLabels = (selectedLabelIds) => {
    const { board } = this.props;
    const labelsSelected = board.labels.filter((label) =>
      selectedLabelIds.includes(label.id)
    );
    this.setState((prevState) => ({
      ...prevState,
      selectedLabels: labelsSelected,
    }));
  };

  setSelectedMembers = (selectedMembers) => {
    const { loggedinUser } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      selectedMembers: selectedMembers,
      loggedinUserIsJoin: selectedMembers.find(
        (member) => member._id === loggedinUser._id
      )
        ? true
        : false,
    }));
  };

  setSelectedDate = (selectedDate) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedDate: selectedDate,
    }));
  };

  setTaksDetailsTitle = (title) => {
    const { currTask } = this.state;
    currTask.title = title;
    this.updateTaskDetails({ ...currTask, title });
  };

  setBgUrlCover = (bgUrlCover) => {
    this.setState((prevState) => ({ ...prevState, bgUrlCover }));
  }

  toggleTaskDone = () => {
    const { currTask } = this.state;
    currTask.isDone = !currTask.isDone;
    this.updateTaskDetails(currTask);
  };

  joinTask = () => {
    let { currTask, selectedMembers } = this.state;
    selectedMembers = selectedMembers || [];
    const selectedMembersIds =
      selectedMembers.map((member) => member._id) || [];
    const { loggedinUser } = this.props;
    if (!selectedMembersIds.includes(loggedinUser._id)) {
      selectedMembers.push(loggedinUser);
    }
    currTask.members = selectedMembers;
    this.addActivity('add-self')
    this.setSelectedMembers(selectedMembers);
    this.updateTaskDetails(currTask);
  };

  deleteTask = async () => {
    const { currGroup, currTask } = this.state;
    const { board } = this.props
    const currGroupIdx = board.groups.indexOf(currGroup)
    currGroup.tasks = currGroup.tasks.filter(
      (task) => task.id !== currTask.id
    );
    board.groups[currGroupIdx] = currGroup
    this.addActivity('remove-task')
    await this.updateBoard(board);
    this.props.history.goBack();
  }

  toggleIsArchive = () => {
    const { currTask } = this.state;
    currTask.isArchive = currTask?.isArchive || false
    currTask.isArchive = !currTask.isArchive;
    this.addActivity((currTask.isArchive) ? 'add-to-archive' : 'remove-from-archive')
    this.updateTaskDetails(currTask);
  }

  addActivity = (activityType, txt = null) => {
    const { board } = this.props;
    const { currTask } = this.state;
    board.activities.push(boardService.createActivity(activityType, currTask, txt))
    this.updateBoard(board)
  }

  render() {
    const {
      currentTarget,
      isPopover,
      type,
      selectedLabels,
      selectedDate,
      selectedMembers,
      currTask,
      currGroup,
      bgColorCover,
      loggedinUserIsJoin,
      bgUrlCover
    } = this.state;
    const { board, loggedinUser, boards, currTaskDetails } = this.props;

    if (!currTaskDetails || !board) return <LoaderSpinner />;
    const { style } = currTaskDetails;
    currTaskDetails.style = (style) ? style : { bgColor: null, bgUrl: null }
    const { bgColor, bgUrl } = currTaskDetails.style
    const { isArchive } = currTaskDetails
    const taskStyle = {
      position: "fixed",
      inset: 0,
      height: "100vh",
      overflowY: "auto",
      zIndex: 90,
    };

    return (
      <div style={taskStyle}>
        <div
          className="overlay show"
          onClick={() => this.props.history.push(`/board/${board._id}`)}
        ></div>
        <section className="task-details flex column">
          <button
            onClick={() => this.props.history.push(`/board/${board._id}`)}
            className={`close-task-details ${bgColor ? "cover" : ""}`}
          >
            <Close />
          </button>
          {(bgColor || bgUrl) && (
            <TaskCardCover
            />
          )}

          {isArchive &&
            <div className="task-details-archived flex">
              <i class="fas fa-archive icon-sm"></i>
              <h3>This card is archived.</h3>
            </div>
          }


          <TaskHeader
            taskTitle={currTask.title}
            setTaksDetailsTitle={this.setTaksDetailsTitle}
            taskList={currGroup.title}
          />
          <div className="task-details-body flex">
            <div className="task-details-main flex column">
              {(selectedLabels || selectedMembers || selectedDate) && (
                <TaskHeaderDetails
                  setCurrentTarget={this.setCurrentTarget}
                  selectedLabels={currTaskDetails.labelIds}
                  selectedMembers={currTaskDetails.members}
                  selectedDate={currTaskDetails.dueDate}
                  toggleTaskDone={this.toggleTaskDone}
                  currTask={currTaskDetails}
                  updateTaskDetails={this.updateTaskDetails}
                  addActivity={this.addActivity}
                />
              )}
              <TaskDescription
                currTask={currTask}
                updateTaskDetails={this.updateTaskDetails}
              />
              <TaskAttachment
                currTask={currTask}
                updateTaskDetails={this.updateTaskDetails}
                addActivity={this.addActivity}
                setBgUrlCover={this.setBgUrlCover}
              />
              <TaskChecklist
                currTask={currTask}
                updateTaskDetails={this.updateTaskDetails}
                addActivity={this.addActivity}
              />
              <TaskActivities
                currTask={currTask}
                loggedinUser={loggedinUser}
                activities={board.activities}
                updateTaskDetails={this.updateTaskDetails}
              />
            </div>
            <TaskActionsMenu
              loggedinUserIsJoin={loggedinUserIsJoin}
              joinTask={this.joinTask}
              setCurrentTarget={this.setCurrentTarget}
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
    boards: state.boardModule.boards,
    loggedinUser: state.userModule.loggedinUser,
    popover: state.appModule.popover,
    currTaskDetails: state.appModule.currTaskDetails
  };
}
const mapDispatchToProps = {
  saveBoard,
  saveTaskDetails,
  setCurrTaskDetails
};

export const TaskDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskDetails);
