import React, { Component } from "react";
import { BoardHeader } from "../cmps/BoardHeader";
import { connect } from "react-redux";
import { loadBoard, clearBoard } from "../store/board.actions";
import { loadUsers } from "../store/user.actions";
import { GroupList } from "../cmps/GroupList";
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import { DragDropContext} from "react-beautiful-dnd"

class _BoardApp extends Component {
  componentDidMount = async () => {
    this.loadBoard();
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

    if (id) {
      try {
        await this.props.loadBoard(id);
      } catch (err) {
        console.log("cant load board", err);
      }
    }
  };

   onDragEnd =()=>{
    //later
    console.log('dragend')
  }
  render() {
    console.log(this.props);

    const { board } = this.props;
    if (!board) return <LoaderSpinner />;
    return (
      <DragDropContext
      onDragEnd={this.onDragEnd}
    >
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
  };
}
const mapDispatchToProps = {
  loadBoard,
  clearBoard,
  loadUsers,
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
