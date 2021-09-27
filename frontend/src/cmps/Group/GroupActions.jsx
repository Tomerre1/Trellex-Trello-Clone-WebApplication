import React from "react";
export function GroupActions(props) {
  
  return (
    <div className="group-menu" style={props.menuPos}>
      <h3>List actions</h3>
      <button
        onClick={() => {
          props.removeGroup(props.boardId, props.groupId);
          props.toggleMenuShown(false);
        }}
      >
        Delete list
      </button>
      <div className="overlay"></div>
    </div>
  );
}
