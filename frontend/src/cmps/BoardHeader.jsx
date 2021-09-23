import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveBoard } from "../store/board.actions";

function _BoardHeader(props) {
  const { board } = props;
  const [isTitleEdit, setTitleEdit] = useState(false);
  const [title, setTitle] = useState(board.title);

  if (!board) return <h2>Loading</h2>;
  return (
    <header className={`main-header board-header flex align-center`}>
      <div className="header-btn-container flex">
        {!isTitleEdit ? (
          <h2 className="header-btn" onClick={() => setTitleEdit(true)}>
            {board.title}{" "}
          </h2>
        ) : (
          <form>
            <input
              autoFocus
              className="header-btn"
              onBlur={() => {
                setTitleEdit(false);
              }}
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            ></input>
          </form>
        )}

        <Link to="/workspace" className="header-btn">
          boards
        </Link>
      </div>
      <div className="header-btn-container flex">
        <button className="header-btn">add</button>
        <button className="header-btn">notifications</button>
        <div className="user-profile">
          <p>BS</p>
        </div>
      </div>
    </header>
  );
}
function mapStateToProps(state) {
  return {
    user: state.boardModule.board,
  };
}
export const BoardHeader = connect(mapStateToProps)(_BoardHeader);
