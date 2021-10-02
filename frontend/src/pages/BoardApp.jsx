import React, { Component } from "react";
import { BoardHeader } from "../cmps/BoardHeader";
import { connect } from "react-redux";
import { loadBoard,loadBoards, clearBoard, handleDrag } from "../store/board.actions";
import { loadUsers } from "../store/user.actions";
import { GroupList } from "../cmps/GroupList";
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import { DragDropContext } from "react-beautiful-dnd";

class _BoardApp extends Component {
  componentDidMount = async () => {
    this.loadBoard();
    if(!this.props.boards.length)
    this.props.loadBoards()
    this.props.loadUsers();
  };

  componentWillUnmount = () => {
    this.props.clearBoard();
  };

  componentDidUpdate = () => {
    if (this.props.match.params?.boardId !== this.props.board?._id) {
      this.props.clearBoard();
      this.loadBoard();
      this.props.loadUsers();
    }
  };
  loadBoard = async () => {
    const id = this.props.match.params.boardId;
    if(!id) this.props.history.push('/workspace')
    if (id) {
      try {
        await this.props.loadBoard(id);
        if (this.props.board == null) 
        this.props.history.push('/workspace')

      } catch (err) {
        console.log("cant load board", err);
      }
    }
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    this.props.handleDrag(
      { ...this.props.board },
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };
  render() {
    const { board } = this.props;
    if (!board) return <LoaderSpinner />;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <section
          className="board-app flex column"
          style={{
            background: board.style.bgImg
              ? `url(${board.style.bgImg})`
              : board.style.bgClr,
          }}
        >
          <BoardHeader board={{ ...board }} />
          <GroupList
            groups={[...board.groups]}
            boardId={board._id}
            boardLabels={[...board.labels]}
          />
        </section>
      </DragDropContext>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    boards:state.boardModule.boards
  };
}
const mapDispatchToProps = {
  loadBoard,
  loadBoards,
  clearBoard,
  loadUsers,
  handleDrag,
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
