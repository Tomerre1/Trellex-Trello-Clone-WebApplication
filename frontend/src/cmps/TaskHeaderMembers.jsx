import React from 'react'
import { MemberList } from './MemberList'

export function TaskHeaderMembers({ members, setCurrentTarget }) {
    if (members.length === 0) return <></>
    return (

        <div className="task-details-header-members flex column">
            <h4 className="task-details-header-title"> Members</h4>
            <div className="container flex wrap">
                <MemberList members={members} isInDetails={true} setCurrentTarget={setCurrentTarget} />
            </div>
        </div>
    )
}


