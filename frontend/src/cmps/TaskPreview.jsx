import React from "react";
import { Link } from "react-router-dom";

export function TaskPreview(props) {
  const { task, taskUrl } = props;

  return (
    <Link to={taskUrl} className="clean-link">
    <article className="task-preview clean-link" >
      <div className="task-cover">cover color/image here</div>
      {task.labelIds && (
        <div className="task-labels">label id's{task.labelIds.join(",")}</div>
      )}
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
    </article>
    </Link>
  );
}
