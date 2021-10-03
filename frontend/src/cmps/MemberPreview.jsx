import React, { useState } from "react";
import { MemberPopup } from "./MemberPopup";
import {
    setCurrTaskDetails,
    setPosition,
    togglePopover,
  } from "../store/app.actions";

export function MemberPreview({ member, isInPreview, isEditMode }) {
  const [isPopOpen, togglePopOpen] = useState(false);

  const openPop = (ev) => {
    togglePopOpen(!isPopOpen);
  };

  return (
    <>
     {isPopOpen && (
        <MemberPopup
          member={member}
          togglePopOpen={togglePopOpen}
          isInPreview={isInPreview}
        />
      )}
      <article
        className="member-wrapper"
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation()
          if (isEditMode) return;
          if (isInPreview) return
          openPop(ev);
        }}
      >
        {member?.imgUrl ? (
          <img src={member.imgUrl} className="member-img" alt={"member-img"} />
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
     
    </>
  );
}
