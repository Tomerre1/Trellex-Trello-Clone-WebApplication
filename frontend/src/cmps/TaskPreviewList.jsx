import React from "react";
import { TaskPreview } from "./TaskPreview";
import { Droppable } from "react-beautiful-dnd";

export function TaskPreviewList(props) {
  const { groupId, boardId, boardLabels, tasks } = props;

  return (
      tasks?.map((task, idx) => (
        <TaskPreview
          task={task}
          key={task.id}
          id={task.id}
          index={idx}
          taskUrl={`/board/${boardId}/${groupId}/${task.id}`}
          boardLabels={boardLabels}
          groupId={groupId}
          boardId={boardId}
        />
      ))
   
  );
  }
