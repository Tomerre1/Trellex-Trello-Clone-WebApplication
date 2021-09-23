import React from "react";
import { Link } from "react-router-dom";

export function BoardPreview(props) {
  const { board } = props;
  const getBg = () => {
    return board.style.bgImg ? `url(${board.style.bgImg})` : board.style.bgClr
  };
  return (
    <article className="board-preview">
      <Link to={`/board/${board._id}`}>
        <div
          className="board-content"
          style={{
            background: getBg(),
          }}
        ></div>
        <p className="board-title">{board.title}</p>
      </Link>
    </article>
  );
}
