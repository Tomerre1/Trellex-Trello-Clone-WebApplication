import React, { useState } from "react";
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
          <h2 className="title" onClick={() => setTitleEdit(true)}>
            {title}
          </h2>
        ) : (
          <form>
            <input
              autoFocus
              className="title"
              onBlur={() => {
                setTitleEdit(false);
              }}
              value={title}
              style={{ width: `${title.length}ch` }}
              onChange={(ev) => setTitle(ev.target.value)}
            ></input>
          </form>
        )}
      </div>
      <div className="header-btn-container flex">
        <button className="header-btn">Dashboard</button>
        <button className="header-btn">Show Menu</button>
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
