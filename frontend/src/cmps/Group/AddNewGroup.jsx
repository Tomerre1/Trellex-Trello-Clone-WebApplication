import React, { useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addGroup } from "../../store/board.actions";
import AddIcon from "@mui/icons-material/Add";
import Loader from "react-loader-spinner";
import { Close } from "@mui/icons-material";



function _AddNewGroup(props) {
  const boardId = props.match.params.boardId;
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState('');
  const [btnText, setBtnText] = useState("Add list");
  const toggleIsClicked = () => {
    setIsClicked(!isClicked)
  };

  const addGroup = async () => {
    try{
      setBtnText(<Loader type="Grid" color={"white"} height={14} width={14} />)
      await props.addGroup(boardId, title)
      setBtnText('Add list')
      setTitle()
      toggleIsClicked()
      
    } catch(err) {
        setBtnText('Add list')
        console.log('%c%s', 'color: #733d00', err);
    }
  }
// if(isClicked) {
  return (
    <div className="add-group-wrapper">
    { !isClicked 
    ? 
    <article
      className="group-details add-new"
      onClick={() => {
        toggleIsClicked()
      }}
    >
      <div className="flex align-center">
        <AddIcon className="icon" />
        Add a list
      </div>
    </article> 
    :
      <form onSubmit={(ev) => {ev.preventDefault()}}>
    <div className="add-group-active group-details flex column scale-up-ver-top"  >
    <input
      value={title}
      placeholder="Enter list title..."
      onChange={(ev) => setTitle(ev.target.value)}
      className="group-preview"
      autoFocus
      // onBlur={toggleIsClicked}
    />

    <div className={`group-btns flex align-center`}>
      <button
        onClick={addGroup}
        className="group-btn save-group-title-btn"
      >
        {btnText}
      </button>
      <button
        className="group-btn close-group-title-btn"
        onClick={toggleIsClicked}
        >
        <Close />
      </button>
    </div>
  </div>
        </form>
    }
    </div>
  );
}
const mapDispatchToProps = {
  addGroup,
};
export const AddNewGroup = withRouter(
  connect(null, mapDispatchToProps)(_AddNewGroup)
);
