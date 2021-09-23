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
          backgroundColor: board.style.bgClr,
          backgroundImage: board.style.bgImg,
        }}
      ></div>
      <p className="board-title">{board.title}</p>
      </Link>
    </article>
  );
}
