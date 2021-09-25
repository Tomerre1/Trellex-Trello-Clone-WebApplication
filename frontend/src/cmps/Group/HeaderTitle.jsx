import React, { useState } from "react";
import { connect } from "react-redux";
import { saveBoard } from "../../store/board.actions";

const _HeaderTitle = (props) => {
  const group = { ...props.group };
  const [groupTitle, setTitle] = useState(group.title);

  const saveTitle = async () => {
    const newBoard = { ...props.board };
    const grpIdx = newBoard.groups.findIndex((grp => group.id === grp.id))
    console.log(grpIdx)
    newBoard.groups[grpIdx].title = groupTitle;
    try {
      await props.saveBoard(newBoard);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <input
      className="group-title flex column"
      value={groupTitle}
      onChange={(ev) => setTitle(ev.target.value)}
      onBlur={saveTitle}
    />
  );
};
function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}

const mapDispatchToProps = {
  saveBoard,
};
export const HeaderTitle = connect(
  mapStateToProps,
  mapDispatchToProps
)(_HeaderTitle);
