import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { AddNewGroup } from "./Group/AddNewGroup";
import { TaskPreviewList } from "./TaskPreviewList";
import { AddNewTask } from "./Group/AddNewTask";
import { HeaderTitle } from "./Group/HeaderTitle";
import { removeGroup } from "../store/board.actions";
import { toggleDragDisable } from "../store/app.actions";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { GroupActions } from "./Group/GroupActions";
import { Draggable } from "react-beautiful-dnd";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";

const _GroupDetails = (props) => {
  const {
    group,
    isAddNew,
    boardId,
    boardLabels,
    index,
    isDragDisabled,
    toggleDragDisable,
  } = props;
  const elRef = useRef();
  const [isMenuShown, toggleMenuShown] = useState(false);
  const [menuPos, setMenuPos] = useState({});

  const toggleMenu = (ev) => {
    let posX = window.innerWidth - ev.pageX > 200 ? ev.pageX : ev.pageX - 200;
    setMenuPos({
      position: "fixed",
      top: `${ev.pageY}px`,
      left: `${posX}px`,
    });
    toggleMenuShown(!isMenuShown);
    toggleDragDisable();
  };

  const scrollToBottom = () => {
    elRef.current.scrollTo({
      top: elRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  if (isAddNew) return <AddNewGroup />;

  return (
    // }
    // <Droppable droppableId={groupId}>
    // {(provided)=>(
    // <div {...provided.droppableProps} ref={provided.innerRef}>
    // {provided.placeholder}
    //     </div>
    //       )}
    //     </Droppable>

    // <Draggable draggableId={task.id} index={index}>
    //   {(provided) => (
    //     <div
    //     ref={provided.innerRef}
    //     {...provided.draggableProps}
    //     {...provided.dragHandleProps}></div>

    <div>
      <Draggable
        draggableId={group.id}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <NaturalDragAnimation
            style={provided.draggableProps.style}
            snapshot={snapshot}
          >
            {(style) => (
              <article
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={style}
                className="group-details flex column"
              >
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
                <div className={`group-main flex column `} ref={elRef}>
                  <TaskPreviewList
                    tasks={group.tasks}
                    boardId={boardId}
                    groupId={group.id}
                    boardLabels={boardLabels}
                    toggleDragDisable={toggleDragDisable}
                  />
                </div>
                <div className="group-footer">
                  <AddNewTask
                    ids={{ groupId: group.id, boardId }}
                    scrollToBottom={scrollToBottom}
                  />
                </div>
              </article>
            )}
          </NaturalDragAnimation>
        )}
      </Draggable>
    </div>
  );
};

const mapDispatchToProps = {
  removeGroup,
  toggleDragDisable,
};
function mapStateToProps(state) {
  return {
    isDragDisabled: state.appModule.isDragDisabled,
  };
}
export const GroupDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupDetails);
