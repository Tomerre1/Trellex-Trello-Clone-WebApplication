import React, { Component } from "react";
import { BoardHeader } from "../cmps/BoardHeader";
import { connect } from "react-redux";
import { loadBoard, clearBoard } from "../store/board.actions";
import { loadUsers } from "../store/user.actions";
import { GroupList } from "../cmps/GroupList";
import { LoaderSpinner } from "../cmps/LoaderSpinner";

class _BoardApp extends Component {
  componentDidMount = async () => {
    this.props.clearBoard(); // added because componentWillUnmount is disabled
    this.loadBoard();
    this.props.loadUsers()
  };

  // componentWillUnmount = () => {
    // this.props.clearBoard();
  // };


  loadBoard = async () => {
    const id = this.props.match.params.boardId;
    if (id) {
      try {
        await this.props.loadBoard(id);
      } catch (err) {
        console.log('cant load boards',err);
      }
    }
  };

  render() {
    const { board } = this.props;
    if (!board) return <LoaderSpinner />;
    return (
      <section
        className="board-app flex column"
        style={{
          background: board.style.bgImg
            ? `url(${board.style.bgImg})`
            : board.style.bgClr,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <BoardHeader board={board} />
        <GroupList groups={board.groups} boardId={board._id} boardLabels={board.labels}/>
      </section>
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
  loadUsers
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
