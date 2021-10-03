import { useState } from "react";
import { connect } from "react-redux";
import { updateTask } from "../../store/board.actions";
import { TaskLabels } from "./TaskLabels";
import { TaskDetailsPreview } from "./TaskDetailsPreview";
import { TaskDatePreview } from "./TaskDatePreview";
import { MemberList } from "../MemberList";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { TaskActions } from "./TaskActions";

export function _TaskPreviewEdit({
  task,
  groupId,
  boardId,
  boardLabels,
  getChecklistData,
  menuPos,
  toggleMenu,
  updateTask,
  taskUrl,
}) {
  const {
    style,
    labelIds,
    dueDate,
    title,
    description,
    comments,
    attachments,
    checklists,
    todos,
    doneTodos,
  } = task;

  const [editTitle, setEditTitle] = useState(title);

  const updateTaskName = async () => {
    const newTask = { ...task };
    newTask.title = editTitle;
    try {
      await updateTask(boardId, groupId, newTask);
      toggleMenu()
    } catch (err){
      console.log('error when setting title',err)
    }
  };

  return (
    <>
      <article
        className="task-preview-container edit"
        style={{ zIndex: 100, borderRadius: 3 }}
      >
        {style?.bgUrl && (
          <img
            className="task-cover-img"
            src={style.bgUrl}
            style={{
              backgroundColor: "white",
              borderRadius: "3px",
              objectFit: "contain",
              maxHeight: 240,
            }}
            alt=""
          />
        )}

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
            <TaskLabels labelIds={labelIds} boardLabels={boardLabels} />
          )}
          <textarea
            className="task-title"
            value={editTitle}
            autoFocus
            onChange={(ev) => setEditTitle(ev.target.value)}
          />
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
            {attachments?.length > 0 && (
              <TaskDetailsPreview
                icon={<AttachFileIcon className="icon attach" />}
                txt={attachments.length}
              />
            )}
            {checklists?.length > 0 && todos !== 0 && (
              <TaskDetailsPreview
                icon={<CheckBoxOutlinedIcon className="icon"/>}
                txt={getChecklistData()}
                isDone={getChecklistData(true)}
              />
            )}
            {task?.members && (
              <MemberList members={task.members} isInPreview={true} />
            )}
          </div>
        </div>
      </article>
      <button
        className="save-btn"
        onClick={() => {
          updateTaskName();
        }}
      >
        Save
      </button>
      <TaskActions
        toggleMenu={toggleMenu}
        menuPos={menuPos}
        groupId={groupId}
        boardId={boardId}
        task={task}
        taskUrl={taskUrl}
      />
    </>
  );
}
const mapDispatchToProps = {
  updateTask,
};
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}
export const TaskPreviewEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskPreviewEdit);
