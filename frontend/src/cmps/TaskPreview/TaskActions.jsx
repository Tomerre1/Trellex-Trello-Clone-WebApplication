import {connect} from 'react-redux';
import {removeTask} from "../../store/board.actions"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function _TaskActions(props) {
    const {menuPos , groupId,boardId,task ,removeTask} = props;
  return (
    <div className="task-preview-menu" style={menuPos}>
      <h3>Task actions</h3>
      <button onClick={()=> removeTask(boardId,groupId,task.id)}><DeleteOutlineIcon size="small"/>Delete task</button>
      <button>Action 2</button>
      <button>Action 3</button>
      <button>Action 4</button>
      <button>Action 5</button>
    </div>
  );
}

const mapDispatchToProps = {
    removeTask
}
export const TaskActions = connect(null,mapDispatchToProps)(_TaskActions)
