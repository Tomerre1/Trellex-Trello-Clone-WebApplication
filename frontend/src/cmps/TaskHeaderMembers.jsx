import React from 'react'
import { connect } from 'react-redux'
import { MemberList } from './MemberList'

export function _TaskHeaderMembers({ currTaskDetails }) {
    if (!currTaskDetails.members||currTaskDetails.members.length === 0) return <></>
    return (
        <div className="task-details-header-members flex column">
            <h4 className="task-details-header-title"> Members</h4>
            <div className="container flex wrap">
                <MemberList members={currTaskDetails.members} isInDetails={true} />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
    };
}

export const TaskHeaderMembers = connect(
    mapStateToProps,
    null
)(_TaskHeaderMembers);


