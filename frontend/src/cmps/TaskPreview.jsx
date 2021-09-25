import React from "react";
import { Link } from "react-router-dom";
import { TaskLabels } from "./TaskPreview/TaskLabels";
import { TaskDetailsPreview } from "./TaskPreview/TaskDetailsPreview";
import { TaskDatePreview } from "./TaskPreview/TaskDatePreview";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

export function TaskPreview(props) {
  const { task, taskUrl, boardLabels } = props;
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
  return (
    <Link to={taskUrl} className="clean-link">
      <article className="task-preview clean-link">
        <div className="task-cover">cover color/image here</div>
        {labelIds && (
          <TaskLabels labelIds={labelIds} boardLabels={boardLabels} />
        )}
        <div className="task-title">{title}</div>
        <div className="task-preview-icons flex align-center">
          {dueDate && <TaskDatePreview dueDate={dueDate} isDone={task.isDone}/>}
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
      </article>
    </Link>
  );
}
