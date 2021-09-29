import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
        <DeleteOutlineIcon /> Delete list
      </button>
    </div>
  );
}
