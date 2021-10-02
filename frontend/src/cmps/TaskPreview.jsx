import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TaskLabels } from "./TaskPreview/TaskLabels";
import { TaskDetailsPreview } from "./TaskPreview/TaskDetailsPreview";
import { toggleDragDisable } from "../store/app.actions";
import { TaskDatePreview } from "./TaskPreview/TaskDatePreview";
import { TaskActions } from "./TaskPreview/TaskActions";
import { MemberList } from "../cmps/MemberList";
import { Draggable } from "react-beautiful-dnd";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";

function _TaskPreview(props) {
  const {
    task,
    taskUrl,
    boardLabels,
    groupId,
    boardId,
    index,
    isDragDisabled,
    toggleDragDisable,
  } = props;
  const {
    labelIds,
    title,
    dueDate,
    comments,
    checklists,
    description,
    attachments,
    style,
  } = task;

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
    toggleDragDisable();
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
  // full cover image
  if (style?.bgUrl && style?.coverMode === "full") {
    if (style && style?.coverMode === "full")
      return (
        <Draggable
          draggableId={task.id}
          index={index}
          isDragDisabled={isDragDisabled}
        >
          {(provided) => (
            <article
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Link to={taskUrl} className="clean-link">
                <div
                  className={`task-preview-container full-cover img`}
                  src={style.bgUrl}
                >
                  <img className="" src={style.bgUrl} alt="" />
                  <div className="img-overlay" />
                  <p>{task.title}</p>
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
                </div>
                {isMenuShown && (
                  <TaskActions
                    toggleMenu={toggleMenuShown}
                    menuPos={menuPos}
                    groupId={groupId}
                    boardId={boardId}
                    task={task}
                  />
                )}
              </Link>
              <div
                className={`overlay ${isMenuShown ? "show" : ""}`}
                onClick={toggleMenu}
              ></div>
            </article>
          )}
        </Draggable>
      );
  }

  // full color cover
  if (style && style?.coverMode === "full")
    return (
      <Draggable
        draggableId={task.id}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided) => (
          <article
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className="task-preview-container full-cover"
              style={{ background: style.bgColor }}
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
            </div>
            {isMenuShown && (
              <TaskActions
                toggleMenu={toggleMenuShown}
                menuPos={menuPos}
                groupId={groupId}
                boardId={boardId}
                task={task}
              />
            )}
          </article>
        )}
        {isMenuShown && (
          <TaskActions
            toggleMenu={toggleMenuShown}
            menuPos={menuPos}
            groupId={groupId}
            boardId={boardId}
            task={task}
          />
        )}
        <div
          className={`overlay ${isMenuShown ? "show" : ""}`}
          onClick={toggleMenu}
        ></div>
      </Draggable>
    );
  // normal
  return (
    <>
      <Draggable
        draggableId={task.id}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {isMenuShown && (
              <TaskActions
                toggleMenu={toggleMenuShown}
                menuPos={menuPos}
                groupId={groupId}
                boardId={boardId}
                task={task}
              />
            )}
               <article
              className="task-preview-container"
              style={{boxShadow:'none' }}
            >
            {style?.bgUrl && (
              
              <Link to={taskUrl} className="clean-link">
                <img
                  className="task-cover-img"
                  src={style.bgUrl}
                  style={{ backgroundColor: "white", borderRadius: "3px"}}
                  alt=""
                />
              </Link>
            )}
         
              <Link to={taskUrl} className="clean-link">
                {style?.bgColor && !style?.bgUrl && (
                  <div
                    className="task-cover"
                    style={{ background: task.style.bgColor }}
                  ></div>
                )}

                <div
                  className="task-preview clean-link "
   
                style={
                  style?.bgUrl && {
                    position: "relative",
                    top: "-8px",
                    marginBottom: "-8px",
                    borderRadius: "0px 0px 3px 0px"
                  }
                }
                >
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
                        icon={
                          <ChatBubbleOutlineRoundedIcon className="icon msg" />
                        }
                        txt={comments.length}
                      />
                    )}
                    {attachments?.length > 0 && (
                      <TaskDetailsPreview
                        icon={<AttachFileIcon className="icon attach" />}
                        txt={attachments.length}
                      />
                    )}
                    {checklists?.length > 0 && todos !== 0 && (
                      <TaskDetailsPreview
                        icon={<CheckBoxOutlinedIcon className="icon" />}
                        txt={getChecklistData()}
                        isDone={
                          todos === doneTodos && todos !== 0 ? true : false
                        }
                      />
                    )}
                    {task?.members && (
                      <MemberList members={task.members} isInPreview={true} />
                    )}
                  </div>
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
            <div
              className={`overlay ${isMenuShown ? "show" : ""}`}
              onClick={toggleMenu}
            ></div>
          </div>
        )}
      </Draggable>
    </>
  );
}
function mapStateToProps(state) {
  return {
    isDragDisabled: state.appModule.isDragDisabled,
  };
}
const mapDispatchToProps = {
  toggleDragDisable,
};

export const TaskPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskPreview);
