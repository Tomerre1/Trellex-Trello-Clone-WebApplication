import React, { useState } from "react";
import { connect } from "react-redux";
import { saveBoard } from "../../store/board.actions";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const _TaskDatePreview = (props) => {

  const [isMouseOver, setMouseOver] = useState(false);
  const [isDone, setIsDone] = useState(props.isDone);

  const toggleIsDone = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setIsDone(!isDone)
    const newBoard = { ...props.board };
    const groupIdx = newBoard.groups.findIndex((group)=>props.groupId === group.id);
    const taskIdx = newBoard.groups[groupIdx].tasks.findIndex((task)=>props.taskId === task.id);
    newBoard.groups[groupIdx].tasks[taskIdx].isDone = !props.isDone
    try {
      await props.saveBoard(newBoard)
    }
    catch(err){
      console.log('cant change task status',err)
      setIsDone(!isDone)

    }
  };

  return (
    <span
      className={`due-date ${
        !isDone && props.dueDate < Date.now() ? "overdue" : ""
      }${isDone ? "done" : ""}`}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={toggleIsDone}
    >
      {!isDone && (
        <>
          {!isMouseOver ? (
            <AccessTimeOutlinedIcon className="icon" />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon className="icon" />
          )}
        </>
      )}
      {isDone && (
        <>
          {!isMouseOver ? (
            <CheckBoxOutlinedIcon className="icon" />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon className="icon" />
          )}
        </>
      )}
      <p>
        {new Date(props.dueDate).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}
      </p>
    </span>
  );
};
const mapDispatchToProps = {
  saveBoard
}
function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}
export const TaskDatePreview = connect(mapStateToProps,mapDispatchToProps)(_TaskDatePreview);
