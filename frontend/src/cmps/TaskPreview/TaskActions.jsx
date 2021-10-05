import { Component } from "react";
import { connect } from "react-redux";
import { updateTask } from "../../store/board.actions";
import {
  setCurrTaskDetails,
  setPosition,
  togglePopover,
} from "../../store/app.actions";
import { Link } from "react-router-dom";
import ArchiveIcon from "@mui/icons-material/Archive";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import LabelIcon from "@material-ui/icons/LocalOfferOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CoverIcon from "@material-ui/icons/VideoLabel";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScheduleIcon from "@mui/icons-material/Schedule";

class _TaskActions extends Component {
  state = { selectedAction: "" };

  componentWillUnmount = () => {
    if (this.props.isPopoverOpen) this.props.togglePopover();
    this.setState({ selectedAction: "" });
  };

  setActiveAction = (ev) => {
    ev.stopPropagation();
    this.setState({ selectedAction: ev.target.parentElement.dataset.type });
  };

  sendToArchive = async () => {
    const newTask = { ...this.props.task };
    newTask.isArchive = true;
    try {
      this.props.updateTask(this.props.boardId, this.props.groupId, newTask);
      this.props.toggleMenu();
    } catch (err) {
      console.log("error when sending to archive", err);
    }
  };

  popoverDispatch = (ev, type) => {
    this.props.task.style = this.props.task.style
      ? this.props.task.style
      : (this.props.task.style = {});
    this.props.setCurrTaskDetails(this.props.task);
    this.props.setPosition({
      pos: { pageX: ev.pageX, pageY: ev.pageY },
      type,
    });
    this.props.togglePopover();
  };

  render() {
    const { menuPos, toggleMenu, taskUrl } = this.props;

    return (
      <div className="task-actions flex column slide-in-left" style={menuPos}>
        <Link to={taskUrl} onClick={toggleMenu} className="clean-link">
          <button>
            <PictureInPictureIcon className="action-icon" />
            <p>Open card</p>
          </button>
        </Link>
        <button
          className={`${
            (this.state.selectedAction === "labels" && this.props.isPopoverOpen)? "active" : ""
          }`}
          data-type="labels"
          onClick={(ev) => {
            this.setActiveAction(ev);
            this.popoverDispatch(ev, "LABELS");
          }}
        >
          <LabelIcon className="action-icon" />
          <p>Edit labels</p>
        </button>
        <button
          className={`${
            (this.state.selectedAction === "members" && this.props.isPopoverOpen)? "active" : ""
          }`}
          data-type="members"
          onClick={(ev) => {
            this.setActiveAction(ev);
            this.popoverDispatch(ev, "MEMBERS");
          }}
        >
          <PersonOutlineIcon className="action-icon" />
          <p>Change members</p>
        </button>
        <button
          className={`${(this.state.selectedAction === "cover" && this.props.isPopoverOpen)? "active" : ""}`}
          data-type="cover"
          onClick={(ev) => {
            this.setActiveAction(ev);

            this.popoverDispatch(ev, "COVER");
          }}
        >
          <CoverIcon className="action-icon" />
          <p>Change cover</p>
        </button>
        <button
          className={`${(this.state.selectedAction === "move" && this.props.isPopoverOpen)? "active" : ""}`}
          data-type="move"
          onClick={(ev) => {
            this.setActiveAction(ev);
            this.popoverDispatch(ev, "MOVE");
          }}
        >
          <ArrowForwardIcon className="action-icon" />
          <p>Move</p>
        </button>
        <button
          className={`${(this.state.selectedAction === "copy" && this.props.isPopoverOpen) ? "active" : ""}`}
          data-type="copy"
          onClick={(ev) => {
            this.setActiveAction(ev);
            this.popoverDispatch(ev, "COPY");
          }}
        >
          <CopyIcon className="action-icon" />
          <p>Copy</p>
        </button>
        <button
          className={`${(this.state.selectedAction === "date"&& this.props.isPopoverOpen) ? "" : ""}`}
          data-type="date"
          onClick={(ev) => {
            this.setActiveAction(ev);
            this.popoverDispatch(ev, "DATE");
          }}
        >
          <ScheduleIcon className="action-icon" />
          <p>Edit date</p>
        </button>
        <button onClick={this.sendToArchive}>
          <ArchiveIcon className="action-icon" />
          <p>Archive</p>
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = {
  updateTask,
  setPosition,
  setCurrTaskDetails,
  togglePopover,
};
const mapStateToProps = (state) => {
  return {
    isPopoverOpen: state.appModule.popover.isOpen,
  };
};
export const TaskActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskActions);
