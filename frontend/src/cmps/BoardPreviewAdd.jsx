import React, { useState } from "react";

export function BoardPreviewAdd(props) {
  const { board } = props;
  const [bg, setBg] = useState("black");
  const [title, setTitle] = useState("Title");
  const [isEditMode,toggleEditMode] = useState(false)
  return (
    <article className="board-preview">
        <div
          className="board-content"
          style={{
            background: bg,
            backgroundSize: "cover",
          }}
        >
        <p>Add a board</p>
        <>
        <input
          className="board-title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <button onClick={()=>props.onAdd(title,bg)}>add</button>
        </>
        </div>
    </article>
  );
}
