import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { saveBoard, setFilterBy } from "../store/board.actions";
import { MemberList } from "./MemberList";
import { MembersAddToBoard } from "../cmps/MembersAddToBoard";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Close } from '@mui/icons-material';

import {
  togglePopover,
  setPosition,
  setPopoverMenu,
} from "../store/app.actions";

import { Link } from "react-router-dom";

function _BoardHeader(props) {
  const { board, setFilterBy } = props;
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
        ><PersonAddAlt1Icon className="icon"/>
        </button>
        {isMembersPopup && (
          <MembersAddToBoard setMembersPopup={setMembersPopup} />
        )}
      </div>
      <div className="header-btn-container flex ">
        <Link to={`/board/${board._id}/dashboard`} className="clean-link">
          <button className="header-btn"><BarChartIcon className="icon" /> <span className="btn-txt">Dashboard</span></button>
        </Link>
        {(props.filterBy.search || props.filterBy.labels.length > 0 || props.filterBy.members.length > 0) && <div className="flex results">
          <button
            className="header-btn btn-results"
            onClick={(event) => {
              props.setPosition({
                pos: { pageX: event.pageX, pageY: event.pageY },
                type: "BOARD_FILTER_CARDS",
              });
              props.setPopoverMenu(true);
              props.togglePopover(false);
            }}
          >
            Change Filter
          </button>
          <span className="flex" style={{ alignItems: 'center', backgroundColor: "#61bd4f" }}>
            <Close className="icon clean-btn"
              onClick={(event) => { event.stopPropagation(); setFilterBy({ labels: [], members: [], search: '' }) }}
            />
          </span>

        </div>
        }
        <button
          className="header-btn last-in-row menu"
          style={{paddingRight:10}}
          onClick={(event) => {
            props.setPosition({
              pos: { pageX: event.pageX, pageY: event.pageY },
              type: "BOARD_SHOW_MENU",
            });
            props.setPopoverMenu(true);
            props.togglePopover(false);
          }}
        >
          <MoreHorizOutlinedIcon className="icon menu" /> <span className="btn-txt">Show Menu</span>
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
  setFilterBy
};
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    filterBy: state.boardModule.filterBy,
  };
}
export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
