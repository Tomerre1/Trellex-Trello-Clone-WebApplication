import React, { Component } from "react";
import { connect } from "react-redux";
import { BoardList } from "../cmps/Workspace/BoardList";
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import { loadBoards,addBoard } from "../store/board.actions";

class _Workspace extends Component {
  componentDidMount = () => {
    this.props.loadBoards();
  };

  addBoard = async (title ,bgClr ='black',bgImg="") =>{
    if ( !title ) return
    const newBoard = await this.props.addBoard(title,bgClr,bgImg)
  }

  render() {
    const { boards } = this.props;
    return (
      <section className="workspace-page main-layout flex column">
        <h1>Your Workspace</h1>
        {boards.length ? <BoardList boards={boards} onAdd={this.addBoard}/> : <LoaderSpinner />}
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
