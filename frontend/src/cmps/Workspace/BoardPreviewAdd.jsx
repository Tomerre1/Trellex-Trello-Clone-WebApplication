import React, { useState } from "react";
import { BoardAddPalette } from "../Workspace/BoardAddPalette";

export function BoardPreviewAdd(props) {
  const [bgClr, setBgClr] = useState(
    "linear-gradient(to bottom, #000000, #434343)"
  );
  const [bgImg, setBgImg] = useState("");
  const [title, setTitle] = useState("");
  const [isEditMode, toggleEditMode] = useState(false);
  // const [bgClrs, setBgClrs] = useState([]);
  // if(props.boardMode === true) toggleEditMode(true)
  return (
    <article className="board-preview-add">
      <div
        className="board-content flex column"
        style={{
          background: `${bgImg ? `url(${bgImg})` : bgClr} center`,
        }}
      >
        {!isEditMode && !props.boardMode ? (
          <div
            className="add-inactive"
            onClick={() => toggleEditMode(!isEditMode)}
          >
            <p>Add a board</p>
          </div>
        ) : (
          <div className="add-active fade-in">
            <button
              className="closer"
              onClick={() =>
                !props.boardMode
                  ? toggleEditMode(!isEditMode)
                  : props.setCreateShown(false)
              }
            ></button>
            <div className="title-box flex">
              <form>
                <input
                  className="board-title"
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                  placeholder="New board title"
                />
                <button
                  onClick={(ev) => {
                    ev.preventDefault();
                    if (!title) return;
                    props.onAdd(title, bgClr, bgImg);
                    setBgClr("linear-gradient(to bottom, #000000, #434343)");
                    setBgImg("");
                    setTitle("");
                    toggleEditMode();
                  }}
                >
                  Create
                </button>
              </form>
            </div>
            <div className="color-box">
              <BoardAddPalette
                bgClr={bgClr}
                setBgClr={setBgClr}
                setBgImg={setBgImg}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
