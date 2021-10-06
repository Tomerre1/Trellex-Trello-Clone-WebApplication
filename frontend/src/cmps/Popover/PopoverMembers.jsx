import React, { Component } from 'react'
import { PopoverMemberPreview } from './PopoverMemberPreview'
import { Popover } from './Popover'
import { connect } from 'react-redux'
import { saveTaskDetails, addActivity } from '../../store/board.actions'
export class _PopoverMembers extends Component {
    state = {
        search: '',
    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        this.setState(prevState => ({
            ...prevState,
            currGroup,
        }))
    }

    handleSearch = (e) => {
        this.setState(prevState => ({
            ...prevState,
            search: e.target.value
        }))
    }

    toggleMemberCheck = async (member) => {
        const { board, currTaskDetails, addActivity, loggedinUser } = this.props
        const { currGroup } = this.state
        currTaskDetails.members = currTaskDetails?.members || []
        const selectedMembersIds = currTaskDetails.members.map(member => member._id) || []
        const updatedMembers = (selectedMembersIds.includes(member._id)) ?
            currTaskDetails.members.filter(currMember => currMember._id !== member._id) :
            [...currTaskDetails.members, member]
        currTaskDetails.members = updatedMembers
        this.setState(prevState => ({ ...prevState, selectedMembers: updatedMembers, selectedMembersIds }))
        if (member._id === loggedinUser._id) {
            addActivity(board, currTaskDetails, (selectedMembersIds.includes(member._id)) ? 'remove-self' : 'add-self')
        } else {
            addActivity(board, currTaskDetails, (selectedMembersIds.includes(member._id)) ? 'remove-member' : 'add-member', member.fullname)
        }
        await this.props.saveTaskDetails(board, currGroup, currTaskDetails)
    }

    render() {
        const { title, board, currTaskDetails } = this.props
        const { search } = this.state

        return (
            <Popover title={title} >
                <div className="members-popover">
                    <input type="search" placeholder="Search members" onChange={this.handleSearch} />
                    <h4>BOARD MEMBERS</h4>

                    <ul className="clean-list">
                        {board && board.members.length > 0 &&
                            board.members.filter(member => member.fullname.toLowerCase().includes(search.toLowerCase()))
                                .map((member, idx) => <PopoverMemberPreview
                                    toggleMemberCheck={this.toggleMemberCheck}
                                    member={member}
                                    selectedMembersIds={currTaskDetails.members?.map(member => member._id) || []}
                                    members={board.members}
                                    key={idx}
                                />)
                        }
                    </ul>
                </div>
            </Popover >
        )
    }
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        popover: state.appModule.popover,
        board: state.boardModule.board,
        loggedinUser: state.userModule.loggedinUser,
    };
}
const mapDispatchToProps = {
    saveTaskDetails,
    addActivity
};

export const PopoverMembers = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PopoverMembers);
