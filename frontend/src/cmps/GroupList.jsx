import React from "react";
import { GroupDetails } from "./GroupDetails";
import { Droppable } from "react-beautiful-dnd";

export function GroupList(props) {
  const { groups, boardId, boardLabels } = props;

  return (
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
            style={{ maxHeight: document.clientHeight - 130, height: document.clientHeight - 130 }}
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
