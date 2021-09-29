import React from 'react'
import {TaskPreview} from './TaskPreview'

export  function TaskPreviewList(props) {
  const {groupId,boardId,boardLabels,tasks} = props;

  return (
        tasks?.map((task, idx) => (
          <TaskPreview
            task={task}
            key={idx}
            id={task.id}
            taskUrl={`/board/${boardId}/${groupId}/${task.id}`}
            boardLabels={boardLabels}
            groupId={groupId}
            boardId={boardId}
          />
        ))
  )
}
