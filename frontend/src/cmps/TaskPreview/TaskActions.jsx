import { connect } from "react-redux";
import { removeTask } from "../../store/board.actions";
import {Link} from 'react-router-dom'
import ArchiveIcon from '@mui/icons-material/Archive';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import LabelIcon from '@material-ui/icons/LocalOfferOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CoverIcon from '@material-ui/icons/VideoLabel';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScheduleIcon from '@mui/icons-material/Schedule';


function _TaskActions(props) {
  const { menuPos, groupId, boardId, task, removeTask, toggleMenu,taskUrl } = props;
  return (
    <div className="task-actions flex column" style={menuPos}>
     <Link to={taskUrl} onClick={toggleMenu} className="clean-link"> <button><PictureInPictureIcon className="action-icon"/><p>Open card</p></button></Link>
      <button><LabelIcon className="action-icon"/><p>Edit labels</p></button>
      <button><PersonOutlineIcon className="action-icon"/><p>Change members</p></button>
      <button><CoverIcon className="action-icon"/><p>Change cover</p></button>
      <button><ArrowForwardIcon className="action-icon"/><p>Move</p></button>
      <button><CopyIcon className="action-icon"/><p>Copy</p></button>
      <button><ScheduleIcon className="action-icon"/><p>Edit date</p></button>
      <button
        onClick={() => {
          removeTask(boardId, groupId, task.id);
          toggleMenu();
        }}
      >
        <ArchiveIcon className="action-icon"/>
        <p>Archive(still delete)</p> 
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  removeTask,
};
export const TaskActions = connect(null, mapDispatchToProps)(_TaskActions);
