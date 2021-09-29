import React from "react";
import { GroupDetails } from "./GroupDetails";
import { Droppable } from "react-beautiful-dnd";

export function GroupList(props) {
  const { groups, boardId, boardLabels } = props;

  return (
    // <Droppable droppableId={groupId}>
    // {(provided)=>(
    // <div {...provided.droppableProps} ref={provided.innerRef}>
    // {provided.placeholder}
    //     </div>
    //       )}
    //     </Droppable>
    <>
      <Droppable
        droppableId={"all-groups"}
        type="group"
        direction={"horizontal"}
      >
        {(provided) => (
          <div
            className="group-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {groups.map((group, idx) => (
              <div key={group.id}>
                <GroupDetails
                  group={group}
                  boardId={boardId}
                  index={idx}
                  id={group.id}
                  boardLabels={boardLabels}
                />
              </div>
            ))}
            {provided.placeholder}
            <GroupDetails isAddNew={true} />
          </div>
        )}
      </Droppable>
    </>
  );
}
