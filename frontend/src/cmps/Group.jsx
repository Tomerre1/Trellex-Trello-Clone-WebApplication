import React from "react";
import {TaskPreview} from "./TaskPreview"
import HomeIcon from '@mui/icons-material/Home';

export function Group(props) {
  const { group } = props;
  return (
    <article className="group flex column">   
      <div className="group-header">
      <p className="group-title flex column">{group.title}</p>
      </div>
        {group.tasks.map((task,idx) =><TaskPreview task={task} key={idx}/>)}
        <div className="group-footer">
          {/* will be an add task component */}
          add new +
        </div>
    </article>
  );
}
