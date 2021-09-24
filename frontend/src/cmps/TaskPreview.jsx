import React from "react";

export function TaskPreview(props) {
  const { task } = props;

  return (
    <article className="task-preview">
      <div className="task-cover">cover color/image here</div>
      {task.labelIds && (
        <div className="task-labels">label id's{task.labelIds.join(",")}</div>
      )}
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
    </article>
  );
}
