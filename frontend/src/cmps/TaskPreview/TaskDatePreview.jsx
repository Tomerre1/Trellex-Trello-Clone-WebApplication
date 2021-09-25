import React, { useState } from "react";
import { connect } from "react-redux";
import { saveBoard } from "../../store/board.actions";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const _TaskDatePreview = (props) => {

  const [isMouseOver, setMouseOver] = useState(false);
  console.log(props.groupId);

  const toggleIsDone = async (ev) => {
    console.log(props)
    ev.preventDefault();
    ev.stopPropagation();
    const newBoard = { ...props.board };
    console.log(newBoard);
    const groupIdx = newBoard.groups.findIndex((group)=>props.groupId === group.id);
    console.log(groupIdx);
    const taskIdx = newBoard.groups[groupIdx].tasks.findIndex((task)=>props.taskId === task.id);
    newBoard.groups[groupIdx].tasks[taskIdx].isDone = !props.isDone
    try {
      await props.saveBoard(newBoard)
    }
    catch(err){
      console.log('cant change task status',err)
    }
  };

  return (
    <span
      className={`due-date ${
        !props.isDone && props.dueDate < Date.now() ? "overdue" : ""
      }${props.isDone ? "done" : ""}`}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={toggleIsDone}
    >
      {!props.isDone && (
        <>
          {!isMouseOver ? (
            <AccessTimeOutlinedIcon className="icon" />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon className="icon" />
          )}
        </>
      )}
      {props.isDone && (
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
