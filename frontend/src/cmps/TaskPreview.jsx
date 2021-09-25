import React from "react";
import { Link } from "react-router-dom";
import { TaskLabels } from "./TaskPreview/TaskLabels";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";

export function TaskPreview(props) {
  const { task, taskUrl, boardLabels } = props;
  
  const getChecklistData = () => {
    let todos = 0;
    let doneTodos = 0;
    task.checklists.forEach((checklist) => {
      todos += checklist.todos.length;
      checklist.todos.forEach((todo) => {
        if (todo.isDone) doneTodos += 1;
      });
    });
    return `${doneTodos}/${todos}`;
  };

  return (
    <Link to={taskUrl} className="clean-link">
      <article className="task-preview clean-link">
        <div className="task-cover">cover color/image here</div>
        {task.labelIds && (
          <TaskLabels labelIds={task.labelIds} boardLabels={boardLabels} />
        )}
        <div className="task-title">{task.title}</div>
        <div className="task-description">{task.description}</div>
        <div className="task-preview-icons flex align-center">
          {task.description && (
            <SubjectOutlinedIcon className="checkbox-icon" />
          )}
          {task.checklists && task.checklists.length && (
            <span className="checklist-preview flex align-center">
              <CheckBoxOutlinedIcon className="checkbox-icon" />{" "}
              <p>{getChecklistData()}</p>
            </span>
          )}
          {/* {console.log(task)} */}
        </div>
      </article>
    </Link>
  );
}
