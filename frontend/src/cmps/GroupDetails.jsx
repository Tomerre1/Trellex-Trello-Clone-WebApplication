import React, { useRef } from "react";
import { AddNewGroup } from './Group/AddNewGroup'
import { TaskPreview } from "./TaskPreview";
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
     <AddNewGroup/>
    );

  return (
    <article className="group-details flex column">
      <div className="group-header flex space-between align-center">
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
