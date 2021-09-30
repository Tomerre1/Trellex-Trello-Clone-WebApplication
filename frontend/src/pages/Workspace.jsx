import React, { Component } from "react";
import { connect } from "react-redux";
import { BoardList } from "../cmps/Workspace/BoardList";
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import {
  loadBoards,
  addBoard,
  removeBoard,
  saveBoard,
} from "../store/board.actions";
import StarIcon from "@mui/icons-material/Star";

class _Workspace extends Component {
  componentDidMount = () => {
    this.props.loadBoards();
  };

  addBoard = async (title, bgClr = "black", bgImg = "") => {
    if (!title) return;
    try {
      this.props.addBoard(title, bgClr, bgImg);
    } catch (err) {
      console.log("problem adding board", err);
    }
  };

  render() {
    const { boards } = this.props;
    return (
      <section className="workspace-page main-layout flex column">
        <h1>Your Workspace</h1>
        <h2 className="flex align-center">
        {this.props.boards.some(board=> board.isFavorite) && <StarIcon />}
        </h2>
        <div className="board-lists flex column">
          {boards.length ? (
            <BoardList
              starred={true}
              boards={boards.filter((board) => board.isFavorite)}
              onAdd={this.addBoard}
              onRemove={this.props.removeBoard}
              saveBoard={this.props.saveBoard}
            />
          ) : (
            <LoaderSpinner />
          )}
          {boards.length ? (
            <BoardList
              boards={boards.filter((board) => !board.isFavorite)}
              onAdd={this.addBoard}
              onRemove={this.props.removeBoard}
              saveBoard={this.props.saveBoard}
            />
          ) : (
            <LoaderSpinner />
          )}
        </div>
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
  saveBoard,
};
export const Workspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Workspace);
