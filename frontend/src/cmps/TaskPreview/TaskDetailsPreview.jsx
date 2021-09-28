import React from "react";

export const TaskDetailsPreview = (props) => {
  if (props.txt === "0/0") return <></>;
  return (
    <span
      className={` flex align-center ${
        props.isDone ? "checklist done checklist" : ""
      }`}
    >
      {props.icon}
      {props.txt && <p>{props.txt}</p>}
    </span>
  );
};
