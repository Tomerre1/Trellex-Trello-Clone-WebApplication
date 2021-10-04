import React, { Component } from "react";
import { PopoverMemberPreview } from "./Popover/PopoverMemberPreview";
import { connect } from "react-redux";
import { saveBoard } from "../store/board.actions";

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

  addUserToBoard = async (member) => {
    const { board, saveBoard } = this.props;
    delete member.password;
    const newBoard = { ...board, members: [...board.members, member] };
    await saveBoard(newBoard);
  };

  getFilteredUsers = () => {
    const { board, users } = this.props;
    const fUsers =
      users.filter((user) =>
        board.members.every((member) => member._id !== user._id)
      ) || [];
    return fUsers;
  };

  filteredUsers = this.getFilteredUsers();

  componentDidUpdate = (prevProps) => {
    if (this.props.board.members.length !== prevProps.board.members.length) {
      this.filteredUsers = this.getFilteredUsers();
      this.forceUpdate();
    }
  };

  render() {
    const { title, board, currTaskDetails, users, setMembersPopup } =
      this.props;
    const { search } = this.state;

    return (
      <>
        <div
          className={`overlay show`}
          onClick={() => setMembersPopup(false)}
        ></div>
        <div title={title} className="popover board-member-add">
          <div className="members-popover">
            <input
              type="search"
              placeholder="Search members"
              onChange={this.handleSearch}
            />
            <h4>ADD TO BOARD</h4>

            <ul className="clean-list">
              {this.filteredUsers.length > 0 ?
                this.filteredUsers
                  .filter((member) =>
                    member.fullname.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((member, idx) => (
                    <PopoverMemberPreview
                      toggleMemberCheck={() => this.addUserToBoard(member)}
                      member={member}
                      key={idx}
                      selectedMembersIds={
                        this.boardUsers?.map((member) => member._id) || []
                      }
                      members={users}
                    />
                  )): <p>No members available</p>}
            </ul>
          </div>
        </div>
      </>
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
  saveBoard,
};

export const MembersAddToBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MembersAddToBoard);
