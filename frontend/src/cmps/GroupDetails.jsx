import React from "react";
import { TaskPreview } from "./TaskPreview";
import AddIcon from '@mui/icons-material/Add';


export function GroupDetails(props) {
  const { group, isAddNew } = props;
  if (isAddNew) return <article className="group-details add-new"><div className="flex align-center"><AddIcon/>Add a new list</div></article>;
  return (
    <article className="group-details flex column">
      <div className="group-header">
        <p className="group-title flex column">{group.title}</p>
      </div>
      {group.tasks.map((task, idx) => (
        <TaskPreview task={task} key={idx} />
      ))}
      <div className="group-footer">
        {/* will be an add task component */}
        add new +
      </div>
    </article>
  );
}
