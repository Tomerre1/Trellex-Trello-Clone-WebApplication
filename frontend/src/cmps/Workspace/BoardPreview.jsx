import React from "react";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from '@mui/icons-material/Star';

export function BoardPreview(props) {
  const { board, onRemove, saveBoard } = props;

  const onToggleStar = async () => {
    const newBoard = { ...board };
    newBoard.isFavorite = !newBoard.isFavorite;
    try {
      saveBoard(newBoard);
    } catch (err) {
      console.log("error setting favorite", err);
    }
  };
  return (
    <article className="board-preview">
      <Link to={`/board/${board._id}`}>
        <div
          className="board-content"
          style={{
            background: board.style.bgImg
              ? `url(${board.style.bgImg})`
              : board.style.bgClr,
          }}
        ></div>
        <p className="board-title">{board.title}</p>
      </Link>
      <div className="hover-actions flex">
        <DeleteOutlineIcon
          className="action-icon"
          onClick={() => onRemove(board._id)}
        />
       {board?.isFavorite ? <StarIcon className="action-icon" onClick={onToggleStar}/> : <StarBorderIcon className="action-icon" onClick={onToggleStar} />}
      </div>
    </article>
  );
}
