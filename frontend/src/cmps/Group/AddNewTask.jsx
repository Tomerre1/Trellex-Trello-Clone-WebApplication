import React, {useState} from "react";
import AddIcon from "@mui/icons-material/Add";

export function AddNewTask() {
  return (
    <div className="grp-add-task">
      <AddIcon />
      <p>Add new task</p>
    </div>
  );
}
