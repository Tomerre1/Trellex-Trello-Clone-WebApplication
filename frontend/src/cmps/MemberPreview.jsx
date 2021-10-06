import React, { useState } from "react";
import { MemberPopup } from "./MemberPopup";
import { connect } from "react-redux";

import {
  setCurrTaskDetails,
  setPosition,
  togglePopover,
  setPopoverMenu
} from "../store/app.actions";

function _MemberPreview({
  member,
  isInPreview,
  isEditMode,
  isInHeader,
  isInBoardList,
  task,
  setPosition,
  setCurrTaskDetails,
  togglePopover,
  setPopoverMenu,
  onLogout,
}) {
  const [isPopOpen, togglePopOpen] = useState(false);

  const openPop = (ev) => {
    togglePopOpen(!isPopOpen);
  };

  return (
    <>
      <article
        className="member-wrapper"
        onClick={(ev) => {
          ev.preventDefault();
          //   ev.stopPropagation();
          if (isEditMode) return;
          if (isInPreview) {
            setCurrTaskDetails(task);
            setPosition({
              pos: { pageX: ev.pageX, pageY: ev.pageY },
              type: "MEMBERS",
            });
            setPopoverMenu(false)

            togglePopover();
            return;
          }
          openPop();
        }}
      >
        {member?.imgUrl ? (
          <img src={member.imgUrl} className="member-img" alt={member.fullname[0].toUpperCase()} />
        ) : (
          <div
            className="member-img"
            style={{ background: "rgb(223, 225, 230)", color: "inherit" }}
          >
            <p className={`member-letter ${isInPreview ? "preview" : ""}`}>
              {member?.fullname?.[0].toUpperCase() || ""}
            </p>
          </div>
        )}
      </article>
      {isPopOpen && (
        <MemberPopup
          member={member}
          togglePopOpen={togglePopOpen}
          isInPreview={isInPreview}
          isInHeader={isInHeader}
          isInBoardList={isInBoardList}
          onLogout={onLogout}
        />
      )}
    </>
  );
}

const mapDispatchToProps = {
  setCurrTaskDetails,
  setPosition,
  togglePopover,
  setPopoverMenu
};
export const MemberPreview = connect(null, mapDispatchToProps)(_MemberPreview);
