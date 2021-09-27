import React, { useState,useRef,useEffect } from "react";
import { connect } from "react-redux";
import { saveBoard } from "../store/board.actions";
import { MemberList} from "./MemberList"

function _BoardHeader(props) {
  const { board } = props;

  const [isTitleEdit, setTitleEdit] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [content, setContent] = useState('');
  const [width, setWidth] = useState(0);
  const spanRef = useRef();

  
  useEffect(() => {
    if(!spanRef) return
    setWidth(spanRef.current?.offsetWidth);
  }, [title]);

  // const changeHandler = evt => {
  //   setContent(evt.target.value);
  // };

  const handleText = (ev) => {
    setTitle(ev.target.value)
    // changeHandler(ev)
  }
  const updateTitle = () => {
    const newBoard = { ...board };
    newBoard.title = title.trim();
    setTitle(title.trim())
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
              className={`title ${!title?.length && 'height-adjust'}`}
              onBlur={() => {
                setTitleEdit(false);
                updateTitle();
              }}
              value={title}
              // style={{ width: `${title.length * 13}px`, minWidth: "10px" }}
              onChange={(ev) => {
                handleText(ev)
          
              }}
              style={{width:width +10 ,minWidth:'40px'}}
            ></input>
            {console.log(width)}
          </form>
        )}
       {board?.members && <MemberList members={board.members}/>}
        <button className="header-btn">Invite</button>
      </div>
      <div className="header-btn-container flex">
        <button className="header-btn">Dashboard</button>
        <button className="header-btn">Show Menu</button>
      </div>
    </header>
  );
}
const mapDispatchToProps = {
  saveBoard,
};
function mapStateToProps(state) {
  return {
    user: state.boardModule.board,
  };
}
export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
