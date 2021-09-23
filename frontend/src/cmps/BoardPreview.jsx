import React from "react";
export function BoardPreview(props) {
  const { board } = props;
  console.log(board)
  return (
    <article className="board-preview" style={{backgroundColor:board.style.bgClr,backgroundImage:board.style.bgImg}}>
        <p>{board.title}</p>
    </article>
  );
}
