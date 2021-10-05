import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { saveBoard } from "../store/board.actions";
import { MemberList } from "./MemberList";
import { MembersAddToBoard } from "../cmps/MembersAddToBoard";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BarChartIcon from '@mui/icons-material/BarChart';
import {
  togglePopover,
  setPosition,
  setPopoverMenu,
} from "../store/app.actions";

import { Link } from "react-router-dom";

function _BoardHeader(props) {
  const { board } = props;
  const [isTitleEdit, setTitleEdit] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [width, setWidth] = useState(board.title.length * 9.5);
  const [isMembersPopup, setMembersPopup] = useState(false);
  const spanRef = useRef();

  useEffect(() => {
    if (!spanRef) return;
    if (typeof spanRef.current?.offsetWidth === "number")
      setWidth(spanRef.current?.offsetWidth);
  }, [title]);

  const onToggleStar = async () => {
    const newBoard = { ...board };
    newBoard.isFavorite = !newBoard.isFavorite;
    try {
      props.saveBoard(newBoard);
    } catch (err) {
      console.log("error setting favorite", err);
    }
  };

  const handleText = (ev) => {
    setTitle(ev.target.value);
  };
  const updateTitle = () => {
    const newBoard = { ...board };
    newBoard.title = title.trim();
    setTitle(title.trim());
    props.saveBoard(newBoard);
  };
  if (!board) return <h2>Loading</h2>;
  return (
    <header className={`main-header board-header flex align-center`}>
      <div className="header-btn-container flex">
        {!isTitleEdit ? (
          <h2 className="title" onClick={() => setTitleEdit(true)}>
            {title}
          </h2>
        ) : (
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
            }}
          >
            <span ref={spanRef}>{title}</span>
            <input
              autoFocus
              className={`title ${!title?.length && "height-adjust"}`}
              onBlur={() => {
                setTitleEdit(false);
                updateTitle();
              }}
              value={title}
              onChange={(ev) => {
                handleText(ev);
              }}
              style={{
                width: width + 10,
                minWidth: "40px",
              }}
            ></input>
          </form>
        )}
        <div className="header-btn-container flex">
          <button className="header-btn star">
            {board.isFavorite ? (
              <StarBorderIcon
                className="icon star gold"
                onClick={onToggleStar}
              />
            ) : (
              <StarBorderIcon className="icon star" onClick={onToggleStar} />
            )}
          </button>
          {board?.members && (
            <MemberList members={board.members} isInBoardList={true} />
          )}
        </div>
        <button
          className="header-btn"
          onClick={() => setMembersPopup(!isMembersPopup)}
        >
          Add Members
        </button>
        {isMembersPopup && (
          <MembersAddToBoard setMembersPopup={setMembersPopup} />
        )}
      </div>
      <div className="header-btn-container flex  flex ">
        <Link to={`/board/${board._id}/dashboard`}>
          <button className="header-btn"><BarChartIcon className="icon"/> Dashboard</button>
        </Link>

        <button
          className="header-btn last-in-row"
          onClick={(event) => {
            props.setPosition({
              pos: { pageX: event.pageX, pageY: event.pageY },
              type: "BOARD_SHOW_MENU",
            });
            props.setPopoverMenu(true);
            props.togglePopover();
          }}
        >
          <MoreHorizOutlinedIcon className="icon" /> Show Menu
        </button>
      </div>
    </header>
  );
}
const mapDispatchToProps = {
  saveBoard,
  togglePopover,
  setPosition,
  setPopoverMenu,
};
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}
export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
