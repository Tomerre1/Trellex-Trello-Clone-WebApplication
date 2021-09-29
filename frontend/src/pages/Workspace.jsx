import React, { Component } from "react";
import { connect } from "react-redux";
import { BoardList } from "../cmps/Workspace/BoardList";
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import { loadBoards,addBoard,removeBoard } from "../store/board.actions";

class _Workspace extends Component {
  componentDidMount = () => {
    this.props.loadBoards();
  };

  addBoard = async (title ,bgClr ='black',bgImg="") =>{
    if ( !title ) return
    try{
      this.props.addBoard(title,bgClr,bgImg)
    } 
    catch(err){
      console.log('problem adding board',err)
    }
  }

  render() {
    const { boards } = this.props;
    return (
      <section className="workspace-page main-layout flex column">
        <h1>Your Workspace</h1>
        {boards.length ? <BoardList boards={boards} onAdd={this.addBoard} onRemove={this.props.removeBoard}/> : <LoaderSpinner />}
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
  addBoard,
  removeBoard,
};
export const Workspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Workspace);
