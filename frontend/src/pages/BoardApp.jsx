import React, { Component } from "react";
import { BoardHeader } from "../cmps/BoardHeader";
import { connect } from "react-redux";
import { loadBoard, clearBoard } from "../store/board.actions";
import { GroupList } from "../cmps/GroupList";
import { LoaderSpinner } from "../cmps/LoaderSpinner";
import { Link } from 'react-router-dom'



class _BoardApp extends Component {
  componentDidMount = async () => {
    this.loadBoard();
  };

  // componentWillUnmount = () => {
  //   this.props.clearBoard();
  // };

  loadBoard = async () => {
    const id = this.props.match.params.boardId;
    if (id) {
      console.log(id);
      try {
        await this.props.loadBoard(id);
      } catch (err) {
        console.log(err);
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
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      >
        <BoardHeader board={board} />
        <GroupList groups={board.groups} boardId={board._id}/>
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
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
