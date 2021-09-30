import { connect } from "react-redux";
import { removeTask } from "../../store/board.actions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArchiveIcon from '@mui/icons-material/Archive';

function _TaskActions(props) {
  const { menuPos, groupId, boardId, task, removeTask, toggleMenu } = props;
  return (
    <div className="task-preview-menu" style={menuPos}>
      <h3>Task actions</h3>
      <button
        onClick={() => {
          removeTask(boardId, groupId, task.id);
          toggleMenu();
        }}
      >
        <ArchiveIcon size="small" />
        Archive 
      </button>
      <button>Action 2</button>
      <button>Action 3</button>
      <button>Action 4</button>
      <button>Action 5</button>
    </div>
  );
}

const mapDispatchToProps = {
  removeTask,
};
export const TaskActions = connect(null, mapDispatchToProps)(_TaskActions);
