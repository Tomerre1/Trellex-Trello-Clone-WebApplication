import React, { useState,useEffect } from "react";
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import { TaskLabels } from "./TaskPreview/TaskLabels";
import { TaskDetailsPreview } from "./TaskPreview/TaskDetailsPreview";
import { toggleOverlay } from "../store/app.actions"
import { TaskDatePreview } from "./TaskPreview/TaskDatePreview";
import { TaskActions } from "./TaskPreview/TaskActions";
import { MemberList } from "../cmps/MemberList";
import { Draggable } from "react-beautiful-dnd";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AttachFileIcon from '@mui/icons-material/AttachFile';

 function _TaskPreview(props) {
  const { task, taskUrl, boardLabels, groupId, boardId, index, isAppOverlay, toggleOverlay } = props;
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
    toggleOverlay(!isMenuShown)
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
  if (style?.bgUrl && style?.coverMode === "full") {

  }
  if (style && style?.coverMode === "full")
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <article
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className="task-preview-container full-cover"
              style={{ background: style.bgColor}}
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
          </article>
        )}
      </Draggable>
    );
  return (
    <>
    {isMenuShown && isAppOverlay && (
              <TaskActions
                toggleMenu={toggleMenuShown}
                menuPos={menuPos}
                groupId={groupId}
                boardId={boardId}
                task={task}
              />
            )}
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            
            <article className="task-preview-container">
              <Link to={taskUrl} className="clean-link">
                {style?.bgColor && !style?.bgUrl &&(
                  <div
                    className="task-cover"
                    style={{ background: task.style.bgColor }}
                  ></div>
                )}
               
                <div className="task-preview clean-link">
                {style?.bgUrl && (
                  <img className="task-cover-img" src={style.bgUrl} style={{backgroundColor:'white'}}alt='cover image'/>
                    
                )}
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
                    {attachments?.length > 0 && <TaskDetailsPreview
                       icon={<AttachFileIcon className="icon attach" />}
                       txt={attachments.length}
                    />}
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
          </div>
        )}
      </Draggable>
    </>
  );
}
function mapStateToProps(state) {
  return {
    isAppOverlay: state.appModule.isAppOverlay,
  };
}
const mapDispatchToProps = {
  toggleOverlay
}

export const TaskPreview = connect(mapStateToProps,mapDispatchToProps)(_TaskPreview)

