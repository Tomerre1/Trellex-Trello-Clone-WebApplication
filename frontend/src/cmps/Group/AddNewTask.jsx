import React, {useState} from "react";
import AddIcon from "@mui/icons-material/Add";

export function AddNewTask() {
    const [isClicked,setIsClicked] = useState(false)
    const [taskTitle,setTaskTitle] = useState('')
  return (
    <div className="grp-add-task">
      <AddIcon className="add-icon"/>
      <p>Add a task</p>
    </div>
  );
}
