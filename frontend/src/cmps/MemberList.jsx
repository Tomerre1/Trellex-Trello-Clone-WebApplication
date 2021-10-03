import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { connect } from 'react-redux';
import { setPosition, togglePopover } from '../store/app.actions';


export function _MemberList(props) {
  const { members, isInPreview, isInDetails, togglePopover } = props
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
                  <p className={`member-letter ${isInPreview ? 'preview' : ''}`}>{member?.fullname?.[0].toUpperCase() || ''}</p>
                </div>
              )}
          </article>
        ))}
      {isInDetails &&
        <button className="secondary-btn"
          onClick={(event) => { props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'MEMBERS' }); togglePopover(); }}
        ><AddIcon /></button>}
    </div>
  )
}




function mapStateToProps(state) {
  return {
    currTaskDetails: state.appModule.currTaskDetails,
  };
}
const mapDispatchToProps = {
  setPosition,
  togglePopover
};

export const MemberList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MemberList);


