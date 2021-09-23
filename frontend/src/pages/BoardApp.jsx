import React, { Component } from "react";
import { connect } from "react-redux";
import { loadBoard } from "../store/board.actions";

class _BoardApp extends Component {
  componentDidMount = async () => {
    this.props.loadBoard();
  };

  render() {
    console.log(this.props.board);
    return (
      <div>
        <h1>Board</h1>
      </div>
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
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
