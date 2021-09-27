import React, { Component } from 'react'
import { PopoverMemberPreview } from './PopoverMemberPreview'
import { Popover } from './Popover'

export class PopoverMembers extends Component {
    state = {
        search: '',
        members: [],
        selectedMembers: []
    }

    componentDidMount() {
        const { members, currTask } = this.props
        this.setState(prevState => ({
            ...prevState,
            members,
            selectedMembers: currTask.members
        }))
    }

    handleSearch = (e) => {
        this.setState(prevState => ({
            ...prevState,
            search: e.target.value
        }))
    }
    setSelectedMembers = (selectedMembers) => {
        this.setState(prevState => ({
            ...prevState,
            selectedMembers
        }))
    }

    toggleMemberCheck = async (member) => {
        const { updateTaskDetails, setSelectedLabels, currTask } = this.props
        const updatedMembers = (currTask.members.includes(member)) ?
            currTask.members.filter(currMember => currMember._id !== member._id) :
            [...currTask.members, member]
        currTask.members = updatedMembers
        this.setState(prevState => ({ ...prevState, selectedMembers: updatedMembers }))
        this.setSelectedMembers(updatedMembers)
        updateTaskDetails(currTask)
    }

    render() {
        const { togglePopover, currentTarget, title, members, currTask } = this.props
        const { search, selectedMembers } = this.state
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="members-popover">
                    <input type="search" placeholder="Search members" onChange={this.handleSearch} />
                    <h4>BOARD MEMBERS</h4>

                    <ul className="clean-list">
                        {members &&
                            members.filter(member => member.fullname.toLowerCase().includes(search.toLowerCase()))
                                .map(member => <PopoverMemberPreview toggleMemberCheck={this.toggleMemberCheck} selectedMembers={selectedMembers} member={member} />)
                        }
                    </ul>
                </div>
            </Popover >
        )
    }
}

