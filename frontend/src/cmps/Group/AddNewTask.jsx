import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Close } from "@mui/icons-material";
import {addTask} from "../../store/board.actions"
import { boardService } from "../../services/board.service";

export function AddNewTask(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const toggleIsClicked = () => setIsClicked(!isClicked);

  const onAddTask = ()=>{ 
    boardService.addTask(taskTitle,props.ids.boardId,props.ids.groupId)
  }

  return (
    <div className="grp-add-task">
      {!isClicked ? (
        <div className="add-task-inactive flex" onClick={toggleIsClicked}>
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

          <div className={`task-btns flex align-center`}>
            <button className="task-btn save-task-title-btn">Add task</button>
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
  );
}
