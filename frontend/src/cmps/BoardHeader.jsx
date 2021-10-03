import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { saveBoard } from "../store/board.actions";
import { MemberList } from "./MemberList";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { togglePopover, setPosition, setPopoverMenu } from '../store/app.actions'

function _BoardHeader(props) {
  const { board } = props;
  const [isTitleEdit, setTitleEdit] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [width, setWidth] = useState(board.title.length * 9.5);
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
  const onToggleMenu = (ev) => {
    props.toggleMenu(ev)
    props.togglePopover()

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
        )}{" "}
        <div className="header-btn-container flex">
          <button className="header-btn last-in-row">
            {board.isFavorite ? (
              <StarBorderIcon className="icon star gold" onClick={onToggleStar} />
            ) : (
              <StarBorderIcon className="icon star" onClick={onToggleStar} />
            )}
          </button>
          {board?.members && <MemberList members={board.members} />}
        </div>
        <button className="header-btn">Invite</button>
      </div>
      <div className="header-btn-container flex">
        <button className="header-btn"> Dashboard</button>
        {/* <button className="header-btn" onClick={(ev) => onToggleMenu(ev)}>
          <MoreHorizOutlinedIcon className="icon" /> Show Menu

        </button> */}
        <button className="header-btn" onClick={(event) => { props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'BOARD_SHOW_MENU' }); props.setPopoverMenu(true); props.togglePopover() }}>
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
  setPopoverMenu
};
function mapStateToProps(state) {
  return {
    user: { ...state.boardModule.board },
  };
}
export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
