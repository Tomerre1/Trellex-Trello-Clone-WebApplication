import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Close } from "@mui/icons-material";

export function AddNewTask() {
  const [isClicked, setIsClicked] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const toggleIsClicked = () => setIsClicked(!isClicked);
  return (
    <div className="grp-add-task" onClick={toggleIsClicked}>
      {!isClicked ? (
        <div className="add-task-inactive flex">
          <AddIcon className="add-icon" />
          <p>Add a task</p>
        </div>
      ) : (
        <div className="add-task-active flex column">
          <textarea
            value={taskTitle}
            placeholder="Enter a title for this task..."
            onChange={(ev) => setTaskTitle(ev.target.value)}
            className="task-preview"
          />

          <div className={`description-controls flex align-center`}>
            <button className="task-btns save-task-description-btn">
              Add task
            </button>
            <button
              className="task-btns close-task-description-btn"
              onClick={toggleIsClicked}
            >
              <Close />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
