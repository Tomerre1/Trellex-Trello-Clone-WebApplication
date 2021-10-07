import React from 'react'
import CheckIcon from '@material-ui/icons/Check';

export function PopoverMemberPreview({ member, selectedMembersIds, toggleMemberCheck }) {
    return (
        <li className="member-pop-over-preview flex" onClick={() => { toggleMemberCheck(member) }}>
            {member.imgUrl &&
                <img className="profile-picture" style={{ marginInlineEnd: '8px' }} src={member.imgUrl} alt='member photo' />
            }
            {!member.imgUrl &&
                <div className="profile-picture" style={{ background: "#dfe1e6", marginInlineEnd: '8px' }}>
                    <p className="profile-picture letter" >{member.fullname[0]}</p>
                </div>
            }

            <span>{member.fullname}</span>

            {selectedMembersIds.includes(member._id) &&
                <span className="icon-check flex">
                    <CheckIcon />
                </span>
            }

        </li >
    )
}


