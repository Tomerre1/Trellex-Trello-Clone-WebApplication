import { TaskLabels } from "./TaskLabels";
import { TaskDetailsPreview } from "./TaskDetailsPreview";
import { TaskDatePreview } from "./TaskDatePreview";
import { MemberList } from "../MemberList";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export  function TaskPreviewEdit({ task,groupId,boardId, boardLabels,getChecklistData}) {
    const {style,labelIds,dueDate,title,description,comments,attachments,checklists,todos,doneTodos } = task
  return (
    <article
      className="task-preview-container"
      style={{zIndex:400}}
    >
      {style?.bgUrl && (
          <img
            className="task-cover-img"
            src={style.bgUrl}
            style={{ backgroundColor: "white", borderRadius: "3px" }}
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
              borderRadius: "0px 0px 3px 0px",
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
                icon={<CheckBoxOutlinedIcon className="icon" />}
                txt={getChecklistData()}
                isDone={todos === doneTodos && todos !== 0 ? true : false}
              />
            )}
            {task?.members && (
              <MemberList members={task.members} isInPreview={true} />
            )}
          </div>
        </div>

      
    </article>
  );
}
