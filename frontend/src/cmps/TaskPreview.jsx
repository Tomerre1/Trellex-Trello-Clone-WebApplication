import React from "react";
import { Link } from "react-router-dom";
import { TaskLabels } from "./TaskPreview/TaskLabels";
import { TaskDetailsPreview } from "./TaskPreview/TaskDetailsPreview";
import { TaskDatePreview } from "./TaskPreview/TaskDatePreview";
import { MemberList } from '../cmps/MemberList'
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export function TaskPreview(props) {
  const { task, taskUrl, boardLabels, groupId } = props;
  const { labelIds, title, dueDate, comments, checklists, description } = task;

  const getChecklistData = () => {
    let todos = 0;
    let doneTodos = 0;
    checklists.forEach((checklist) => {
      todos += checklist.todos.length;
      checklist.todos.forEach((todo) => {
        if (todo.isDone) doneTodos += 1;
      });
    });
    return `${doneTodos}/${todos}`;
  };

  if (task.style && task.style?.coverMode === "full")
    return (
      <article
        className="task-preview-container full-cover"
        style={{ background: task.style.bgColor }}
      >
        <Link to={taskUrl} className="clean-link">
          <div className="task-preview">
            <p>{task.title}</p>
          </div>
        </Link>
        <div className="edit-icon">
          <Link to={taskUrl}>
        <ModeEditOutlinedIcon className="icon"/>
        </Link>
        </div>
      </article>
    );
  return (
    <article className="task-preview-container">
      <Link to={taskUrl} className="clean-link">
        {task.style?.bgColor && (
          <div
            className="task-cover"
            style={{ background: task.style.bgColor }}
          ></div>
        )}
        <div className="task-preview clean-link">
          {labelIds && (
            <TaskLabels labelIds={labelIds} boardLabels={boardLabels} />
          )}
          <div className="task-title"><p>{title}</p></div>
          <div className="task-preview-icons flex align-center">
            {dueDate && (
              <TaskDatePreview
                dueDate={dueDate}
                isDone={task.isDone}
                taskId={task.id}
                groupId={groupId}
              />
            )}
            {description && (
              <TaskDetailsPreview
                icon={<SubjectOutlinedIcon className="icon" />}
              />
            )}
            {comments && comments.length > 0 && (
              <TaskDetailsPreview
                icon={<ChatBubbleOutlineRoundedIcon className="icon" />}
                txt={comments.length}
              />
            )}
            {checklists && checklists.length > 0 && (
              <TaskDetailsPreview
                icon={<CheckBoxOutlinedIcon className="icon" />}
                txt={getChecklistData()}
              />
            )}
            
          </div>
          {task?.members && <MemberList members={task.members} isInPreview={true}/>}
        </div>
        <div className="edit-icon">
        <ModeEditOutlinedIcon className="icon"/>
        </div>
      </Link>
    </article>
  );
}
