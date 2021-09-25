import React, { useState } from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

export const TaskDatePreview = (props) => {
  const [isMouseOver, setMouseOver] = useState(false);

  return (
    <span
      className={`due-date ${
        !props.isDone && props.dueDate < Date.now() ? "overdue" : ""
      }${props.isDone ? "done" : ""}`}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
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
      {props.isDone && <CheckBoxOutlinedIcon className="icon" />}
      <p>
        {new Date(props.dueDate).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}
      </p>
    </span>
  );
};
