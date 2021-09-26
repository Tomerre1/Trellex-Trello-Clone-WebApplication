import React, { Component } from "react";
import { connect } from "react-redux";
import { BoardList } from "../cmps/BoardList";
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import { loadBoards,addBoard } from "../store/board.actions";

class _Workspace extends Component {
  componentDidMount = () => {
    this.props.loadBoards();
  };

  addBoard = async () =>{
    const newBoard = await this.props.addBoard()
    console.log(this.props.boards)
  }

  render() {
    const { boards } = this.props;
    return (
      <section className="workspace-page main-layout flex column">
        <h1>Your Workspace</h1>
        {boards.length ? <BoardList boards={boards} /> : <LoaderSpinner />}
        <button onClick={this.addBoard}>add board</button>
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
  addBoard
};
export const Workspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Workspace);
