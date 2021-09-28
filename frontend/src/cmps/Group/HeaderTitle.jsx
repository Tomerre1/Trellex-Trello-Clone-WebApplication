import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveBoard } from "../../store/board.actions";

const _HeaderTitle = (props) => {
  const group = { ...props.group };
  const [groupTitle, setTitle] = useState(group.title);
  useEffect(() => {
    setTitle(props.group.title)
 }, [props.group.title]);

  const saveTitle = async () => {
    const newBoard = { ...props.board };
    const grpIdx = newBoard.groups.findIndex((grp) => group.id === grp.id);
    newBoard.groups[grpIdx].title = groupTitle;
    try {
      await props.saveBoard(newBoard);
    } catch (err) {
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
