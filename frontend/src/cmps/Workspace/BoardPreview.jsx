import React from "react";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarBorderIcon from '@mui/icons-material/StarBorder';

export function BoardPreview(props) {
  const { board, onRemove } = props;

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
      <div className="hover-actions flex">
          <DeleteOutlineIcon className="action-icon" onClick={()=>onRemove(board._id)}/>
          <StarBorderIcon className="action-icon"/>
      </div>
    </article>
  );
}
