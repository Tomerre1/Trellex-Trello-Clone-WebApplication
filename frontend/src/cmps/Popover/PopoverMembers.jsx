import React, { Component } from 'react'
import { PopoverMemberPreview } from './PopoverMemberPreview'
import { Popover } from './Popover'

export class PopoverMembers extends Component {
    state = {
        search: '',
        members: [],
        selectedMembers: [],
        selectedMembersIds: []
    }

    componentDidMount() {
        const { members, currTask } = this.props
        this.setState(prevState => ({
            ...prevState,
            members,
            selectedMembersIds: currTask.members.map(member => member._id)
        }))
    }

    handleSearch = (e) => {
        this.setState(prevState => ({
            ...prevState,
            search: e.target.value
        }))
    }


    toggleMemberCheck = async (member) => {
        const { updateTaskDetails, setSelectedMembers, currTask } = this.props
        const selectedMembersIds = currTask.members.map(member => member._id)
        const updatedMembers = (selectedMembersIds.includes(member._id)) ?
            currTask.members.filter(currMember => currMember._id !== member._id) :
            [...currTask.members, member]
        currTask.members = updatedMembers
        this.setState(prevState => ({ ...prevState, selectedMembers: updatedMembers, selectedMembersIds }))
        setSelectedMembers(updatedMembers)
        updateTaskDetails(currTask)
    }

    render() {
        const { togglePopover, currentTarget, title, currTask, members } = this.props
        const { search, selectedMembersIds } = this.state
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="members-popover">
                    <input type="search" placeholder="Search members" onChange={this.handleSearch} />
                    <h4>BOARD MEMBERS</h4>

                    <ul className="clean-list">
                        {members &&
                            members.filter(member => member.fullname.toLowerCase().includes(search.toLowerCase()))
                                .map(member => <PopoverMemberPreview toggleMemberCheck={this.toggleMemberCheck} member={member} selectedMembersIds={selectedMembersIds} members={members} />)
                        }
                    </ul>
                </div>
            </Popover >
        )
    }
}

