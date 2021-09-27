import React, { useState } from "react";
import { connect } from "react-redux";
import { saveBoard } from "../store/board.actions";

function _BoardHeader(props) {
  const { board } = props;

  const [isTitleEdit, setTitleEdit] = useState(false);
  const [title, setTitle] = useState(board.title);

  const updateTitle = () => {
    const newBoard = { ...board };
    newBoard.title = title;
    props.saveBoard(newBoard);
  };

  if (!board) return <h2>Loading</h2>;
  return (
    <header className={`main-header board-header flex align-center`}>
      <div className="header-btn-container flex">
        {!isTitleEdit ? (
          <h2 className="title" onClick={() => setTitleEdit(true)}>
            {title}
          </h2>
        ) : (
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
            }}
          >
            <input
              autoFocus
              className="title"
              onBlur={() => {
                setTitleEdit(false);
                updateTitle();
              }}
              value={title}
              style={{ width: `${title.length}ch`, minWidth: "10px" }}
              onChange={(ev) => setTitle(ev.target.value)}
            ></input>
          </form>
        )}
        <div className="members">
        {board?.members &&
          
          board.members.map((member, idx) => (
            <article key={idx} className="member-wrapper">
              <img src={member.imgUrl} className="member-img"alt={'member-img'} />
              <p className="member-letter">{member.fullname[0]}</p>
            </article>
          ))}
          </div>
        <button className="header-btn">Invite</button>
      </div>
      <div className="header-btn-container flex">
        <button className="header-btn">Dashboard</button>
        <button className="header-btn">Show Menu</button>
      </div>
    </header>
  );
}
const mapDispatchToProps = {
  saveBoard,
};
function mapStateToProps(state) {
  return {
    user: state.boardModule.board,
  };
}
export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
