import React, { Component } from "react";
import { connect } from "react-redux";
import { Close } from "@mui/icons-material";
import { TaskHeader } from "../cmps/TaskHeader";
import { TaskCardCover } from "../cmps/TaskCardCover";
import { TaskDescription } from "../cmps/TaskDescription";
import { TaskChecklist } from "../cmps/TaskChecklist";
import { TaskActivities } from "../cmps/TaskActivities";
import { TaskActionsMenu } from "../cmps/TaskActionsMenu";
import { PopoverLabels } from "../cmps/Popover/PopoverLabels";
import { PopoverMembers } from "../cmps/Popover/PopoverMembers";
import { PopoverChecklist } from "../cmps/Popover/PopoverChecklist";
import { PopoverDate } from "../cmps/Popover/PopoverDate";
import { PopoverAttachment } from "../cmps/Popover/PopoverAttachment";
import { PopoverCover } from "../cmps/Popover/PopoverCover";
import { TaskHeaderDetails } from "../cmps/TaskHeaderDetails";
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import { PopoverMoveCopy } from "../cmps/Popover/PopoverMoveCopy";
import { saveBoard, saveTaskDetails } from "../store/board.actions";
import { boardService } from '../services/board.service'

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
    const { board, loggedinUser } = this.props;
    const { taskId, listId } = this.props.match.params;
    const currGroup = board.groups.find((list) => list.id === listId);
    const currTask = currGroup.tasks.find((task) => task.id === taskId);
    this.setState((prevState) => ({
      ...prevState,
      bgColorCover: currTask.style?.bgColor || null,
      isPopover: false,
      currGroup,
      currTask,
      currentTarget: null,
      selectedMembers: currTask.members,
      selectedLabels: board.labels.filter((label) =>
        currTask.labelIds.includes(label.id)
      ),
      loggedinUserIsJoin: currTask.members?.find(
        (member) => member._id === loggedinUser._id
      )
        ? true
        : false || false,
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
    await this.updateBoard(board);
    this.props.history.goBack();
  }

  toggleIsArchive = () => {
    const { currTask } = this.state;
    currTask.isArchive = currTask?.isArchive || false
    currTask.isArchive = !currTask.isArchive;
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
    } = this.state;
    const { board, loggedinUser, boards } = this.props;
    if (!currTask || !board) return <LoaderSpinner />;
    const { isArchive } = currTask
    const DynamicCmpPopover = (props) => {
      switch (props.type) {
        case "LABELS":
          return (
            <PopoverLabels
              {...props}
              board={board}
              currGroup={currGroup}
              setSelectedLabels={this.setSelectedLabels}
              title="Labels"
            />
          );
        case "MEMBERS":
          return (
            <PopoverMembers
              {...props}
              title="Members"
              setSelectedMembers={this.setSelectedMembers}
              members={board.members}
            />
          );
        case "CHECKLIST":
          return (
            <PopoverChecklist
              {...props}
              title="Checklist"
              addActivity={this.addActivity}
            // board={board}
            // updateBoard={this.updateBoard}
            />
          );
        case "DATE":
          return (
            <PopoverDate
              {...props}
              title="Date"
              setSelectedDate={this.setSelectedDate}
            />
          );
        case "ATTACHMENT":
          return <PopoverAttachment {...props} title="Attach from..." />;
        case "COVER":
          return (
            <PopoverCover
              {...props}
              setBgColorCover={this.setBgColorCover}
              setIsCover={this.setIsCover}
              title="Cover"
            />
          );
        case "MOVE":
          return (
            <PopoverMoveCopy
              {...props}
              isCopy={false}
              updateBoards={this.updateBoards}
              boards={boards}
              board={board}
              currGroup={currGroup}
              title="Move to"
            />
          );
        case "COPY":
          return (
            <PopoverMoveCopy
              {...props}
              isCopy={true}
              updateBoards={this.updateBoards}
              boards={boards}
              board={board}
              currGroup={currGroup}
              title="Copy"
            />
          );
      }
    };

    const style = {
      position: "fixed",
      inset: 0,
      height: "100vh",
      overflowY: "auto",
      zIndex: 90,
    };

    return (
      <div style={style}>
        <div
          className="overlay show"
          onClick={() => this.props.history.push(`/board/${board._id}`)}
        ></div>
        <section className="task-details flex column">
          <button
            onClick={() => this.props.history.push(`/board/${board._id}`)}
            className={`close-task-details ${bgColorCover ? "cover" : ""}`}
          >
            <Close />
          </button>
          {bgColorCover && (
            <TaskCardCover
              bgColor={bgColorCover}
              setCurrentTarget={this.setCurrentTarget}
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
                  selectedLabels={selectedLabels}
                  selectedMembers={currTask.members}
                  selectedDate={currTask.dueDate}
                  toggleTaskDone={this.toggleTaskDone}
                  currTask={currTask}
                  updateTaskDetails={this.updateTaskDetails}
                  addActivity={this.addActivity}
                />
              )}
              <TaskDescription
                currTask={currTask}
                updateTaskDetails={this.updateTaskDetails}
              />
              <TaskChecklist
                currTask={currTask}
                updateTaskDetails={this.updateTaskDetails}
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

          {isPopover && (
            <DynamicCmpPopover
              togglePopover={this.togglePopover}
              currentTarget={currentTarget}
              updateBoard={this.updateBoard}
              updateTaskDetails={this.updateTaskDetails}
              type={type}
              currTask={currTask}
            />
          )}
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
  };
}
const mapDispatchToProps = {
  saveBoard,
  saveTaskDetails,
};

export const TaskDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskDetails);
