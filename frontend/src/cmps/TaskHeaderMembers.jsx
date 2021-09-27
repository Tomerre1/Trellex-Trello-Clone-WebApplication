import React from 'react'
import { MemberList } from './MemberList'

export function TaskHeaderMembers({ members }) {
    if (members.length === 0) return <></>
    return (

        <div className="task-details-header-members flex column">
            <h4 className="task-details-header-title"> Members</h4>
            <div className="container flex wrap">
                <MemberList members={members} isInDetails={true} />
            </div>
        </div>
        // <div className="task-details-header-labels item-container flex column">
        //     <h3 className="task-details-header-title">Labels</h3>
        //     <div className="labels-container flex wrap">
        //         {selectedLabels.map(label => {
        //             return <span
        //                 key={label.id} className="label" style={{ backgroundColor: label.color }}>
        //                 {label.title}
        //             </span>
        //         })}
        //         <button className="secondary-btn"><AddIcon /></button>
        //     </div>
        // </div>

    )
}


