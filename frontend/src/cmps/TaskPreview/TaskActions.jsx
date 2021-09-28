import React, { useState } from "react";
import {connect } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export function TaskActions(props) {
    const {menuPos , groupId,boardId,task} = props;
  return (
    <div className="task-preview-menu" style={menuPos}>
      <h3>Task actions</h3>
      <button><DeleteOutlineIcon size="small"/>Delete task</button>
      <button>Action 2</button>
      <button>Action 3</button>
      <button>Action 4</button>
      <button>Action 5</button>
    </div>
  );
}
