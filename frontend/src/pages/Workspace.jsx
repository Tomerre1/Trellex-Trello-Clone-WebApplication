import React, { Component } from "react";
import { connect } from "react-redux";
import { socketService } from '../services/socket.service'
import { BoardList } from "../cmps/Workspace/BoardList";
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import {
  loadBoards,
  addBoard,
  removeBoard,
  saveBoard,
} from "../store/board.actions";
import StarBorderIcon from "@mui/icons-material/StarBorder";

class _Workspace extends Component {

  componentDidMount = () => {
    socketService.on("new-board-added", this.props.loadBoards)
    this.props.loadBoards();
  };

  componentWillUnmount() {
    socketService.off("new-board-added")
    // socketService.terminate()
  }

  addBoard = async (title, bgClr = "black", bgImg = "") => {
    if (!title || !title.trim()) return;
    try {
      this.props.addBoard(title, bgClr, bgImg);
      socketService.emit("new-board");
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
          {this.props.boards.some(board => board.isFavorite) && <><StarBorderIcon style={{ height: '35px', width: '35px' }} /> Starred boards</>}
        </h2>
        <div className="board-lists flex column">
            <BoardList
              starred={true}
              boards={boards.filter((board) => board.isFavorite)}
              onAdd={this.addBoard}
              onRemove={this.props.removeBoard}
              saveBoard={this.props.saveBoard}
            />
         
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
