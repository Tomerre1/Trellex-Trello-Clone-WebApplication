import { connect } from "react-redux";
import { removeTask } from "../../store/board.actions";
import ArchiveIcon from '@mui/icons-material/Archive';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import LabelIcon from '@material-ui/icons/LocalOfferOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CoverIcon from '@material-ui/icons/VideoLabel';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScheduleIcon from '@mui/icons-material/Schedule';


function _TaskActions(props) {
  const { menuPos, groupId, boardId, task, removeTask, toggleMenu } = props;
  return (
    <div className="task-actions flex column" style={menuPos}>
      <button><PictureInPictureIcon/><p>Open card</p></button>
      <button><LabelIcon/><p>Edit labels</p></button>
      <button><PersonOutlineIcon/><p>Change members</p></button>
      <button><CoverIcon/><p>Change cover</p></button>
      <button><ArrowForwardIcon/><p>Move</p></button>
      <button><CopyIcon/><p>Copy</p></button>
      <button><ScheduleIcon/><p>Edit date</p></button>
      <button
        onClick={() => {
          removeTask(boardId, groupId, task.id);
          toggleMenu();
        }}
      >
        <ArchiveIcon size="small" />
        <p>Archive(still delete)</p> 
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  removeTask,
};
export const TaskActions = connect(null, mapDispatchToProps)(_TaskActions);
