import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TaskLabels } from "./TaskPreview/TaskLabels";
import { TaskDetailsPreview } from "./TaskPreview/TaskDetailsPreview";
import { TaskDatePreview } from "./TaskPreview/TaskDatePreview";
import { TaskActions } from "./TaskPreview/TaskActions";
import { MemberList } from "../cmps/MemberList";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export function TaskPreview(props) {
  const { task, taskUrl, boardLabels, groupId,boardId } = props;
  const { labelIds, title, dueDate, comments, checklists, description } = task;

  const [isMenuShown, toggleMenuShown] = useState(false);
  const [menuPos, setMenuPos] = useState();

  const toggleMenu = (ev) => {
    let posX = window.innerWidth - ev.pageX > 200 ? ev.pageX : ev.pageX - 200;
    setMenuPos({
      position: "fixed",
      top: `${ev.pageY}px`,
      left: `${posX}px`,
    });
    toggleMenuShown(!isMenuShown);
  };
  let todos;

  let doneTodos;
  const getChecklistData = () => {
    todos = 0;
    doneTodos = 0;
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
            <ModeEditOutlinedIcon className="icon" />
          </Link>
        </div>
      </article>
    );
  return (
    <>
     <div
          className={`overlay ${isMenuShown ? "show" : ""}`}
          onClick={toggleMenu}
        ></div>
        {isMenuShown && (
          <TaskActions toggleMenuShown={toggleMenu} menuPos={menuPos} groupId={groupId} boardId={boardId} task={task} />
        )}
      <article className="task-preview-container">
        <Link to={taskUrl} className="clean-link">
          {task.style?.bgColor && (
            <div
              className="task-cover"
              style={{ background: task.style.bgColor }}
            ></div>
          )}
          <div className="task-preview clean-link">
            {labelIds?.length > 0 && (
              <TaskLabels labelIds={labelIds} boardLabels={boardLabels} />
            )}
            <div className="task-title">
              <p>{title}</p>
            </div>
            <div className="task-preview-icons flex align-center">
              {dueDate && (
                <TaskDatePreview
                  dueDate={dueDate}
                  isDone={task.isDone}
                  taskId={task.id}
                  groupId={groupId}
                />
              )}
              {description?.length > 0 && (
                <TaskDetailsPreview
                  icon={<SubjectOutlinedIcon className="icon" />}
                />
              )}
              {comments?.length > 0 && (
                <TaskDetailsPreview
                  icon={<ChatBubbleOutlineRoundedIcon className="icon msg" />}
                  txt={comments.length}
                />
              )}
              {checklists?.length > 0 && todos !== 0 && (
                <TaskDetailsPreview
                  icon={<CheckBoxOutlinedIcon className="icon" />}
                  txt={getChecklistData()}
                  isDone={todos === doneTodos && todos !== 0 ? true : false}
                />
              )}
            </div>
            {task?.members && (
              <MemberList members={task.members} isInPreview={true} />
            )}
          </div>
          <div
            className="edit-icon"
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              toggleMenu(ev);
            }}
          >
            <ModeEditOutlinedIcon className="icon" />
          </div>
        </Link>
      </article>
    </>
  );
}
