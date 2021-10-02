import React from "react";
import { TaskPreview } from "./TaskPreview";
import { Droppable } from "react-beautiful-dnd";

export function TaskPreviewList(props) {
  const { groupId, boardId, boardLabels, tasks } = props;
  let filteredTasks = tasks.forEach((task,idx) => task.orgInx = idx )
  filteredTasks = tasks.filter((task) => task?.isArchive !== true);
  return (
    <Droppable droppableId={groupId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="task-list">
          {filteredTasks?.map((task) => (
            <TaskPreview
              task={task}
              key={task.id}
              id={task.id}
              index={task.orgInx}
              taskUrl={`/board/${boardId}/${groupId}/${task.id}`}
              boardLabels={boardLabels}
              groupId={groupId}
              boardId={boardId}
            />
          ))}
          {provided.placeholder}
          {!filteredTasks.length && <div style={{visibilty:'hidden',opacity:'0',height:'1px',width:'1px',color:'transparent'}}></div>}
        </div>
      )}
    </Droppable>
  );
}
