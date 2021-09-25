import React from "react";
import { Link } from "react-router-dom";

export function TaskPreview(props) {
  const { task, taskUrl,boardLabels } = props;

  return (
    <Link to={taskUrl} className="clean-link">
    <article className="task-preview clean-link" >
      <div className="task-cover">cover color/image here</div>
      {task.labelIds && (
        <div className="task-labels">{task.labelIds.map(labelId=>{    
          console.log(labelId)
          const label = boardLabels.find(label=> label.id === labelId);
          
          // return <div className="label" style={{background:label.color}}>sdfdf</div>
          return <div className="label" >sdfdf</div>
        })}</div>
      )}
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
    </article>
    </Link>
  );
}
