import React from 'react'

export function MemberList(props) {
  const { members, isInPreview } = props
  return (
    <div className={`members ${isInPreview ? 'preview' : ''}`}>
      {members &&
        members.map((member, idx) => (
          <article key={idx} className="member-wrapper">
            {member?.imgUrl ? (
              <img
                src={member.imgUrl}
                className="member-img"
                alt={"member-img"}
              />
            ) :
              (
                <div className="member-img" style={{ background: "#df3409" }}>
                  {/* <p className="member-letter">{member.fullname[0]}</p> */}
                </div>
              )}
          </article>
        ))}
    </div>
  )
}
