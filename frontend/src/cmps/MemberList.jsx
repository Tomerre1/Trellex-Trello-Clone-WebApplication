import AddIcon from "@mui/icons-material/Add";
import { MemberPreview } from "./MemberPreview";
import { connect } from "react-redux";
import { setPosition, togglePopover,setPopoverMenu } from "../store/app.actions";

export function _MemberList(props) {
  const {
    members,
    isInPreview,
    isInDetails,
    isInHeader,
    togglePopover,
    isEditMode,
    isInBoardList,
    task,
  } = props;
  return (
    <div
      className={`members ${isInPreview ? "preview" : ""}${
        isInHeader ? "in-header" : ""
      } ${task?.members.length >= 5 ? 'many':''}`}
    >
      {members &&
        members.map((member, idx) => (
          <MemberPreview
            isInPreview={isInPreview}
            isEditMode={isEditMode}
            isInHeader={isInHeader}
            isInBoardList={isInBoardList}
            member={member}
            key={idx}
            task={task}
          />
        ))}
      {isInDetails && (
        <button
          className="secondary-btn"
          onClick={(event) => {
            props.setPosition({
              pos: { pageX: event.pageX, pageY: event.pageY },
              type: "MEMBERS",
            });
            togglePopover();
          }}
        >
          <AddIcon />
        </button>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currTaskDetails: state.appModule.currTaskDetails,
  };
}
const mapDispatchToProps = {
  setPosition,
  togglePopover,
  setPopoverMenu,
  
};

export const MemberList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MemberList);
