import React from "react";
import { TaskPreview } from "./TaskPreview";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export function GroupDetails(props) {
  const { group, isAddNew } = props;
  if (isAddNew)
    return (
      <article className="group-details add-new">
        <div className="flex align-center">
          <AddIcon />
          Add a list
        </div>
      </article>
    );
  return (
    <article className="group-details flex column">
      <div className="group-header flex space-between">
        <p className="group-title flex column">{group.title}</p>
        <MoreHorizOutlinedIcon fontSize={"small"} />
      </div>
      {group.tasks.map((task, idx) => (
        <TaskPreview task={task} key={idx} />
      ))}
      <div className="group-footer flex">
        {/* will be an add task component */}
        <AddIcon />
        <p>Add new task</p>
      </div>
    </article>
  );
}
