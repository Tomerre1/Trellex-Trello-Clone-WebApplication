import React, { useState } from "react";

export function BoardPreviewAdd(props) {
  const { board } = props;
  const [bgClr, setBgClr] = useState(
    "linear-gradient(to bottom, #000000, #434343)"
  );
  const [bgImg, setBgImg] = useState("");
  const [title, setTitle] = useState("untitled");
  const [isEditMode, toggleEditMode] = useState(false);
  return (
    <article className="board-preview">
      <div
        className="board-content"
        style={{
          background: bgImg ? `url(${bgImg})` : bgClr,
          backgroundSize: "cover",
          backgroundPosition:'center'
        }}
      >
        <p>Add a board</p>
        <>
          <input
            className="board-title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <button onClick={() => props.onAdd(title, bgClr, bgImg)}>add</button>
        </>
      </div>
    </article>
  );
}
