import React from 'react'
import AddIcon from '@mui/icons-material/Add';

export function MemberList(props) {
  const { members, isInPreview, isInDetails, setCurrentTarget } = props
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
                <div className="member-img" style={{ background: 'rgb(223, 225, 230)', color: 'inherit' }}>
                  <p className={`member-letter ${isInPreview ? 'preview' : ''}`}>{member?.fullname?.[0] || ''}</p>
                </div>
              )}
          </article>
        ))}
      {isInDetails && <button className="secondary-btn" onClick={(event) => { setCurrentTarget(event, 'MEMBERS') }}><AddIcon /></button>}
    </div>
  )
}
