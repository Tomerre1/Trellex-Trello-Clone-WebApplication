import React, { Component } from "react";
import { connect } from "react-redux";
import { BoardList } from "../cmps/BoardList";
import { loadBoards } from "../store/board.actions";

class _Workspace extends Component {
  componentDidMount = () => {
    console.log(this.props);
    this.props.loadBoards();
  };

  render() {
    const { boards } = this.props;
    return (
      <section className="workspace-page main-layout flex column">
        <h1>Your Workspace</h1>
        <BoardList boards={boards} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    boards: state.boardModule.boards,
  };
}
const mapDispatchToProps = {
  loadBoards,
};
export const Workspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Workspace);
