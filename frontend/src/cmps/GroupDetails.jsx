import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { AddNewGroup } from "./Group/AddNewGroup";
import { TaskPreview } from "./TaskPreview";
import { AddNewTask } from "./Group/AddNewTask";
import { HeaderTitle } from "./Group/HeaderTitle";
import { removeGroup } from "../store/board.actions";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { GroupActions } from "./Group/GroupActions";

const _GroupDetails = (props) => {
  const { group, isAddNew, boardId, boardLabels } = props;
  const elRef = useRef();
  const [isMenuShown, toggleMenuShown] = useState(false);
  const [menuPos, setMenuPos] = useState({});


  const toggleMenu = (ev) => {
    let posX = (window.innerWidth - ev.pageX > 200 ) ? ev.pageX : ev.pageX -200;

    setMenuPos({
      position: "fixed",
      top: `${ev.pageY }px`,
      left: `${posX}px`,
    });
    console.dir(document)
    console.log(ev)
    toggleMenuShown(!isMenuShown);
  };

  const scrollToBottom = () => {
    console.log(elRef);
    elRef.current?.scrollTo({
      top: elRef.current.scrollHeight,
      behavior: "smooth",
    });
  };
  if (isAddNew) return <AddNewGroup />;

  return (
    <article className="group-details flex column">
      <div className="group-header flex space-between align-center">
        <HeaderTitle group={group} />
        <MoreHorizOutlinedIcon
          fontSize={"small"}
          onClick={toggleMenu}
          className="dots"
        />

        {isMenuShown && (
          <GroupActions
            menuPos={menuPos}
            removeGroup={props.removeGroup}
            toggleMenuShown={toggleMenuShown}
            boardId={boardId}
            groupId={group.id}
          />
        )}
                <div
          className={`overlay ${isMenuShown ? "show" : ""}`}
          onClick={toggleMenu}
        />
      </div>
      <div className={`group-main flex column `}>
        {group.tasks.map((task, idx) => (
          <TaskPreview
            task={task}
            key={idx}
            taskUrl={`/board/${boardId}/${group.id}/${task.id}`}
            boardLabels={boardLabels}
            groupId={group.id}
          />
        ))}
      </div>
      <div className="group-footer">
        <AddNewTask
          ids={{ groupId: group.id, boardId }}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </article>
  );
};

const mapDispatchToProps = {
  removeGroup,
};
export const GroupDetails = connect(null, mapDispatchToProps)(_GroupDetails);
