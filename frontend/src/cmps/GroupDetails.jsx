import React, { useRef } from "react";
import { TaskPreview } from "./TaskPreview";
import AddIcon from "@mui/icons-material/Add";
import { AddNewTask } from "./Group/AddNewTask";
import { HeaderTitle } from "./Group/HeaderTitle";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export const GroupDetails = (props) => {
  const { group, isAddNew, boardId, boardLabels } = props;
  const elRef = useRef();

  const scrollToBottom = () => {
    console.log(elRef);
    elRef.current?.scrollTo({
      top: elRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

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
        <HeaderTitle group={group} />
        <MoreHorizOutlinedIcon fontSize={"small"} />
      </div>
      <div className={`group-main flex column `} ref={elRef}>
        {group.tasks.map((task, idx) => (
          <TaskPreview
            task={task}
            key={idx}
            taskUrl={`/board/${boardId}/${group.id}/${task.id}`}
            boardLabels={boardLabels}
            groupId={group.id}
          />
        ))}
      </div>
      <div className="group-footer">
        <AddNewTask
          ids={{ groupId: group.id, boardId }}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </article>
  );
};
