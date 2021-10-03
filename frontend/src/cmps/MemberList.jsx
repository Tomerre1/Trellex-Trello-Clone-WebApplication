import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import {MemberPreview} from "./MemberPreview"
import { connect } from "react-redux";
import { setPosition, togglePopover } from "../store/app.actions";



export function _MemberList(props) {
  const { members, isInPreview, isInDetails, togglePopover ,isEditMode,task } = props;
  return (
    <div className={`members ${isInPreview ? "preview" : ""}`}>
      {members &&
        members.map((member, idx) => (
          <MemberPreview member={member} isInPreview={isInPreview} key={idx} isEditMode={isEditMode} task={task}/>
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
};

export const MemberList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MemberList);
