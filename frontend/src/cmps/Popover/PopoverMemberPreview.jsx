import React from 'react'
import CheckIcon from '@material-ui/icons/Check';

export function PopoverMemberPreview({ member, members, selectedMembersIds, toggleMemberCheck }) {
    console.log('%c  member.id:', 'color: #0e93e0;background: #aaefe5;', member.id);
    console.log('%c  selectedMembersIds:', 'color: #00000;background: #aaefe5;', selectedMembersIds);

    return (
        <li className="member-pop-over-preview flex" onClick={() => { toggleMemberCheck(member) }}>
            {member.imgUrl &&
                <img className="profile-picture" style={{ marginInlineEnd: '8px' }} src={member.imgUrl} alt='member photo' />
            }
            {!member.imgUrl &&
                <div className="profile-picture" style={{ background: "#dfe1e6", marginInlineEnd: '8px' }}>
                    <p className="profile-picture letter" style={{ color: 'inherit' }}>{member.fullname[0]}</p>
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


