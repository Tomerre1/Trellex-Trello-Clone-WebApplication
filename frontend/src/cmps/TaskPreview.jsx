import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setPopoverMenu } from "../store/app.actions";
import { TaskPreviewEdit } from "./TaskPreview/TaskPreviewEdit";
import { TaskLabels } from "./TaskPreview/TaskLabels";
import { TaskDetailsPreview } from "./TaskPreview/TaskDetailsPreview";
import { toggleDragDisable } from "../store/app.actions";
import { TaskDatePreview } from "./TaskPreview/TaskDatePreview";
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
    media,
  } = task;

  const [isMenuShown, toggleMenuShown] = useState(false);
  const [menuPos, setMenuPos] = useState();

  const calcPos = (ev) => {
    if (!ev) return;
    let { top, right, height } =
      ev.target.parentElement.parentElement.getBoundingClientRect();
    console.log(top, right, height, window.innerHeight);
    if (top > window.innerHeight - 318) {
      setMenuPos({
        position: "absolute",
        left: `${right}px`,
        bottom: 50,
      });
    } else {
      setMenuPos({
        position: "fixed",
        left: `${right}px`,
        top,
      });
    }
  };
  const toggleMenu = (ev) => {
    calcPos(ev);
    toggleMenuShown(!isMenuShown);
    toggleDragDisable();
    props.setPopoverMenu(false);
  };

  let todos;
  let doneTodos;

  const getChecklistData = (isDone) => {
    todos = 0;
    doneTodos = 0;
    checklists.forEach((checklist) => {
      todos += checklist.todos.length;
      checklist.todos.forEach((todo) => {
        if (todo.isDone) doneTodos++;
      });
    });
    if (isDone) return todos === doneTodos;
    return `${doneTodos}/${todos}`;
  };
  // full cover image
  if (style?.bgUrl && style?.coverMode === "full" && !isMenuShown) {
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
            </Link>
          </article>
        )}
      </Draggable>
    );
  }

  // full color cover
  if (style && style?.coverMode === "full" && !isMenuShown)
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
              <div className="edit-icon" onClick={toggleMenu}>
                <ModeEditOutlinedIcon className="icon" />
              </div>
            </div>
          </article>
        )}
      </Draggable>
    );
  // normal
  if (!isMenuShown)
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
              <article
                className="task-preview-container"
                style={{ boxShadow: "none", zIndex: isMenuShown ? 55 : 0 }}
              >
                {style?.bgUrl && (
                  <Link to={taskUrl} className="clean-link">
                    <img
                      className="task-cover-img"
                      src={style.bgUrl}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "3px",
                        objectFit: "cover",
                        maxHeight: 240,
                      }}
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
                        borderRadius: "0 0 3px 3px",
                      }
                    }
                  >
                    {labelIds?.length > 0 && (
                      <TaskLabels
                        labelIds={labelIds}
                        boardLabels={boardLabels}
                      />
                    )}
                    {media?.videoUrl && (
                      <div
                        className="video flex"
                        onDrag={(ev) => ev.stopPropagation()}
                      >
                        <video width={"100%"} controls>
                          <source src={task.media.videoUrl} type="video/mp4" />
                        </video>
                      </div>
                    )}
                    {media?.audioUrl && (
                      <div className="audio">
                        <audio controls src={task.media.audioUrl} />
                      </div>
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
                        <MemberList
                          members={task.members}
                          isInPreview={true}
                          task={task}
                        />
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
            </div>
          )}
        </Draggable>
      </>
    );
  // edit mode
  else
    return (
      <>
        <div
          className={`overlay ${isMenuShown ? "show" : ""}`}
          onClick={toggleMenu}
          style={{ zIndx: 2 }}
        ></div>
        <TaskPreviewEdit
          task={task}
          getChecklistData={getChecklistData}
          groupId={groupId}
          boardId={boardId}
          boardLabels={boardLabels}
          menuPos={menuPos}
          toggleMenu={toggleMenu}
          taskUrl={taskUrl}
        />
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
  setPopoverMenu,
};

export const TaskPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskPreview);
