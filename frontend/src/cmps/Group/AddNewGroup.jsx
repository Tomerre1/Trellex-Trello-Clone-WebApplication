import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addGroup } from "../../store/board.actions";
import AddIcon from "@mui/icons-material/Add";

function _AddNewGroup(props) {
    const boardId = props.match.params.boardId
  return (
    <article className="group-details add-new" onClick={() => {props.addGroup(boardId)}}>
      <div className="flex align-center">
        <AddIcon />
        Add a list
      </div>
    </article>
  );
}
const mapDispatchToProps = {
  addGroup,
};
export const AddNewGroup = withRouter(
  connect(null, mapDispatchToProps)(_AddNewGroup)
);
