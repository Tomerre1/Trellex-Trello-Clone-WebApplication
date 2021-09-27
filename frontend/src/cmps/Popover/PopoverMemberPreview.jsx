import React from 'react'
import CheckIcon from '@material-ui/icons/Check';

export function PopoverMemberPreview({ member }) {
    console.log('%c  member:', 'color: #0e93e0;background: #0000;', member);

    return (
        <li className="member-pop-over-preview flex">
            {member.imgUrl &&
                <img className="profile-picture" style={{ marginInlineEnd: '8px' }} src={member.imgUrl} alt='member photo' />
            }
            {!member.imgUrl &&
                <div className="profile-picture" style={{ background: "#dfe1e6", marginInlineEnd: '8px' }}>
                    <p className="profile-picture letter" style={{ color: 'inherit' }}>{member.fullname[0]}</p>
                </div>
            }
            <span>{member.fullname}</span>
            <span className="icon-check flex">
                <CheckIcon />
            </span>

        </li >
    )
}


