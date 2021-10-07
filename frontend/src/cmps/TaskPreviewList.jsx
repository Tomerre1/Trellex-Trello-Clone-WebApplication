import React from "react";
import { connect } from "react-redux";
import { TaskPreview } from "./TaskPreview";
import { Droppable } from "react-beautiful-dnd";

export function _TaskPreviewList(props) {
  const { groupId, boardId, boardLabels, tasks, filterBy } = props;

  let filteredTasks = JSON.parse(JSON.stringify(tasks))
  if (filteredTasks.length) {
    filteredTasks.forEach((task, idx) => task.orgIdx = idx)
    filteredTasks = filteredTasks.filter((task) => task?.isArchive !== true);
  }

  if (filterBy.search) {
    const search = filterBy.search.toLowerCase()
    filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(search))
  }

  if (filterBy.labels.length > 0) {
    filteredTasks = filteredTasks.filter(task => task.labelIds.some(labelId => filterBy.labels.every(label => task.labelIds.includes(label))))
  }

  if (filterBy.members.length > 0) {
    filteredTasks = filteredTasks.filter(task => task.members.some(member => filterBy.members.every(member => {
      const taskMembersIds = task.members.map(member => member._id)
      return taskMembersIds.includes(member)
    })))
  }

  return (
    <Droppable droppableId={groupId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="task-list">
          {filteredTasks?.map((task) => (
            <TaskPreview
              task={task}
              key={task.id}
              id={task.id}
              index={task.orgIdx}
              taskUrl={`/board/${boardId}/${groupId}/${task.id}`}
              boardLabels={boardLabels}
              groupId={groupId}
              boardId={boardId}
            />
          ))}
          {provided.placeholder}
          {!filteredTasks.length && <div style={{ visibilty: 'hidden', opacity: '0', height: '1px', width: '1px', color: 'transparent' }}></div>}
        </div>
      )}
    </Droppable>
  );
}

function mapStateToProps(state) {
  return {
    filterBy: state.boardModule.filterBy,
  };
}
const mapDispatchToProps = {

};

export const TaskPreviewList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskPreviewList);
