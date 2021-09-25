import React, { useRef, useState } from "react";
import { TaskPreview } from "./TaskPreview";
import AddIcon from "@mui/icons-material/Add";
import { AddNewTask } from "./Group/AddNewTask";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export const GroupDetails = (props) => {
  const { group, isAddNew, boardId } = props;
  const elRefs = useRef({});
  const [scrollClass, setScrollClass] = useState("");

  if (elRefs.current.wrapper) {
    setScrollClass('scroll')
    console.log(
      "asses",
      elRefs.current.warpper.scrollHeight,
      // elRefs.current.main.scrollHeight
    );
  }
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

      <div
        ref={(el) => {
          elRefs.current.warpper = el;
        }}
        className={`group-main flex column ${scrollClass}`}
      >
        {group.tasks.map((task, idx) => (
          <TaskPreview
            task={task}
            key={idx}
            taskUrl={`/board/${boardId}/${group.id}/${task.id}`}
          />
        ))}
      </div>
      <div className="group-footer">
        {/* will be an add task component */}
        <AddNewTask ids={{ groupId: group.id, boardId }} />
      </div>
      {console.log(elRefs.current)}
    </article>
  );
};
