import React from "react";
import { Link } from "react-router-dom";
import { TaskLabels } from "./TaskPreview/TaskLabels";

export function TaskPreview(props) {
  const { task, taskUrl, boardLabels } = props;

  return (
    <Link to={taskUrl} className="clean-link">
      <article className="task-preview clean-link">
        <div className="task-cover">cover color/image here</div>
        {task.labelIds && <TaskLabels labelIds={task.labelIds} boardLabels={boardLabels}/>}
        <div className="task-title">{task.title}</div>
        <div className="task-description">{task.description}</div>
      </article>
    </Link>
  );
}
