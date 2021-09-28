import React from "react";
import { Link } from "react-router-dom";

export function BoardPreview(props) {
  const { board } = props;

  return (
    <article className="board-preview">
      <Link to={`/board/${board._id}`}>
        <div
          className="board-content"
          style={{
            background: board.style.bgImg
              ? `url(${board.style.bgImg})`
              : board.style.bgClr,
              backgroundSize:'cover',
          }}
        ></div>
        <p className="board-title">{board.title}</p>
      </Link>
    </article>
  );
}
