import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Close } from "@mui/icons-material";
import { addTask } from "../../store/board.actions";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { MediaRecord } from "../MediaRecord";

export function _GroupFooter(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [btnText, setBtnText] = useState("Add task");
  const [mediaType, setType] = useState("");

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const onAddTask = async () => {
    try {
      if (!taskTitle.trim()) return;
      setBtnText(<Loader type="Grid" color={"white"} height={14} width={14} />);
      await props.addTask(
        taskTitle.trim(),
        props.ids.boardId,
        props.ids.groupId
      );
      setTaskTitle("");
      setBtnText("Add task");
      props.scrollToBottom();
    } catch (err) {
      console.log("error when saving task", err);
      setBtnText("Add task");
    }
  };
  const setMediaType = (type) => {
    setType(type);
    type ? props.toggleDragDisable(true) : props.toggleDragDisable(false);
  };

  return (
    <>
      <div className="grp-add-task">
        {!isClicked ? (
          <div className="add-task-inactive flex space-between">
            <div
              className="add-btn flex align-center"
              onClick={toggleIsClicked}
            >
              <AddIcon className="icon" />
              <p>Add a task</p>
            </div>
            <div className="media-btns flex align-center">
              <VideoCallIcon
                className="media-icon"
                onClick={() => setMediaType("video")}
              />
              <MicNoneIcon
                className="media-icon"
                onClick={() => setMediaType("audio")}
              />
            </div>
          </div>
        ) : (
          <div className="add-task-active flex column">
            <textarea
              value={taskTitle}
              placeholder="Enter a title for this task..."
              onChange={(ev) => setTaskTitle(ev.target.value)}
              className="task-preview"
              onClick={props.scrollToBottom}
            />

            <div className={`task-btns flex align-center`}>
              <button
                className="task-btn save-task-title-btn"
                onClick={onAddTask}
              >
                {btnText}
              </button>
              <button
                className="task-btn close-task-title-btn"
                onClick={toggleIsClicked}
              >
                <Close />
              </button>
            </div>
          </div>
        )}
      </div>
      {mediaType && (
        <MediaRecord
          boardId={props.ids.boardId}
          groupId={props.ids.groupId}
          type={mediaType}
          setMediaType={setMediaType}
        />
      )}
    </>
  );
}

const mapDispatchToProps = {
  addTask,
};

export const GroupFooter = connect(null, mapDispatchToProps)(_GroupFooter);
