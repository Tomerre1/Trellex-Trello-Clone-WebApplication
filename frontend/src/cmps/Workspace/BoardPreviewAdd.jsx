import React, { useState } from "react";
import { BoardAddPalette } from "../Workspace/BoardAddPalette";

export function BoardPreviewAdd(props) {
  const { board } = props;
  const [bgClr, setBgClr] = useState(
    "linear-gradient(to bottom, #000000, #434343)"
  );
  const [bgImg, setBgImg] = useState("");
  const [title, setTitle] = useState("");
  const [isEditMode, toggleEditMode] = useState(true);
  // const [bgClrs, setBgClrs] = useState([]);
  return (
    <article className="board-preview-add">
      <div
        className="board-content"
        style={{
          background: bgImg ? `url(${bgImg})` : bgClr,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!isEditMode ? (
          <div
            className="add-inactive"
            onClick={() => toggleEditMode(!isEditMode)}
          >
            <p>Add a board</p>
          </div>
        ) : (
          <div className="add-active">
              <button onClick={() => toggleEditMode(!isEditMode)}>x</button>
            <div className="left">
              <input
                className="board-title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="New board title"
              />
              <button onClick={() => props.onAdd(title, bgClr, bgImg)}>
                add
              </button>
              <div className="right">
                <BoardAddPalette bgClr={bgClr} setBgClr={setBgClr} setBgImg={setBgImg} />
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
