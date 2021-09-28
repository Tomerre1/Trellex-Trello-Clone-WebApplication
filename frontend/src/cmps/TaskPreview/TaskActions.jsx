import React,{useState} from "react";

export function TaskActions(props) {
   
  return (
    <div className="task-preview-menu" style={props.menuPos}>
      <h3>List actions</h3>
      <button>
        Delete task
      </button>
    </div>
  );
}
