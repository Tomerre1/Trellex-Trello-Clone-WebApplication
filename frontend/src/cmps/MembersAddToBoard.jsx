import React, { Component } from "react";
import { PopoverMemberPreview } from "./Popover/PopoverMemberPreview";
import { Popover } from "./Popover/Popover";
import { connect } from "react-redux";
import { saveTaskDetails } from "../store/board.actions";

export class _MembersAddToBoard extends Component {
  state = {
    search: "",
  };

  handleSearch = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      search: e.target.value,
    }));
  };
  boardUsers = [];

  toggleMemberCheck = async (member) => {
    const { board, addActivity, loggedinUser } = this.props;
    const { currGroup } = this.state;
    this.boardUsers = board.members || [];
    const selectedMembersIds =
      this.boardUsers.map((member) => member._id) || [];
    const updatedMembers = selectedMembersIds.includes(member._id)
      ? this.boardUsers.filter((currMember) => currMember._id !== member._id)
      : [...this.boardUsers, member];
    this.boardUsers = updatedMembers;
    this.setState((prevState) => ({
      ...prevState,
      selectedMembers: updatedMembers,
      selectedMembersIds,
    }));
    // if (member._id === loggedinUser._id) {
    //     addActivity((selectedMembersIds.includes(member._id)) ? 'remove-self' : 'add-self')
    // } else {
    //     addActivity((selectedMembersIds.includes(member._id)) ? 'remove-member' : 'add-member', member.fullname)
    // }
    // await this.props.saveTaskDetails(board, currGroup, this.boardUsers);
  };
  
  getFilteredUsers = () =>{ 
      const {board,users} = this.props;
    const fUsers = users.filter(user=>
        board.members.every(member => member._id !== user._id)
    ) || []  
    return fUsers;
}
  filteredUsers = this.getFilteredUsers()
  
  render() {
    const { title, board, currTaskDetails, users } = this.props;
    const { search } = this.state;

    return (
      <div title={title} className='popover board-member-add'>
        <div className="members-popover">
          <input
            type="search"
            placeholder="Search members"
            onChange={this.handleSearch}
          />
          <h4>ADD TO BOARD</h4>

          <ul className="clean-list">
            {this.filteredUsers.length > 0 &&
              this.filteredUsers
                .filter((member) =>
                  member.fullname.toLowerCase().includes(search.toLowerCase())
                )
                .map((member) => (
                  <PopoverMemberPreview
                    toggleMemberCheck={this.toggleMemberCheck}
                    member={member}
                    selectedMembersIds={
                        this.boardUsers?.map((member) => member._id) || []
                    }
                    members={users}
                  />
                ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.userModule.users,
    popover: state.appModule.popover,
    board: state.boardModule.board,
    loggedinUser: state.userModule.loggedinUser,
  };
}
const mapDispatchToProps = {
  saveTaskDetails,
};

export const MembersAddToBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MembersAddToBoard);
