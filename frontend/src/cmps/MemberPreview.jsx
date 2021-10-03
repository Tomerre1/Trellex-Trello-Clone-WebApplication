import React,{useState} from 'react'

 const MemberPopup = (member) => {
    return (
      <div className="member-popup">
        {member?.imgUrl ? (
          <img src={member.imgUrl} className="member-img" alt={"member-img"} />
        ) : (
          <div
            className="member-img"
            style={{ background: "rgb(223, 225, 230)", color: "inherit" }}
          >
            <p className={`member-letter preview`}>
              {member?.fullname?.[0].toUpperCase() || ""}
            </p>
          </div>
        )}
      </div>
    );
  };

export function MemberPreview({member,isInPreview}) {
    const [isPopOpen,togglePopOpen] = useState(false)

    return (
        <article className="member-wrapper" onClick={()=>togglePopOpen(!isPopOpen)}>
        {member?.imgUrl ? (
          <img
            src={member.imgUrl}
            className="member-img"
            alt={"member-img"}
          />
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
       {isPopOpen && MemberPopup(member)}
      </article>
    )
}
