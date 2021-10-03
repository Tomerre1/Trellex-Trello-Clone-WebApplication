import { Link } from "react-router-dom";
import { TaskLabels } from "./TaskLabels";
import { TaskDetailsPreview } from "./TaskDetailsPreview";
import { TaskDatePreview } from "./TaskDatePreview";
import { MemberList } from "../MemberList";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export function TaskMenuPreview({ task, groupId, boardLabels,taskUrl }) {
  const {
    style,
    labelIds,
    dueDate,
    title,
    description,
    comments,
    attachments,
    checklists,
  } = task;
  
  
  let taskTodos = 0;
  let doneTodos = 0;
  
  const getChecklistData = () => {
    
    checklists.forEach((checklist) => {
      taskTodos += checklist.todos.length;
      checklist.todos.forEach((todo) => {
        if (todo.isDone) doneTodos += 1;
      });
    });
    return `${doneTodos}/${taskTodos}`;
  };

  return (
    <Link to={taskUrl}>
      <article
        className="task-preview-container edit"
        style={{ borderRadius: 3 }}
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
          <p className="task-title">{title}</p>
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
            {checklists?.length > 0 && taskTodos !== 0 && (
              <TaskDetailsPreview
                icon={<CheckBoxOutlinedIcon className="icon" />}
                txt={getChecklistData()}
                isDone={taskTodos === doneTodos && taskTodos !== 0 ? true : false}
              />
            )}
            {task?.members && (
              <MemberList members={task.members} isInPreview={true} />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
