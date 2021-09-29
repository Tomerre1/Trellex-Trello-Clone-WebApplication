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

    <Droppable droppableId={'all-groups'}  type={'group'} direction={'horizontal'}>
      {(provided)=>(
    <div className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
      {groups &&
        groups.map((group, idx) => (
          <GroupDetails
            group={group}
            boardId={boardId}
            key={idx}
            index={idx}
            boardLabels={boardLabels}
          />
        ))
        }
      <GroupDetails isAddNew={true} />
      {provided.placeholder}
    </div>

      )}
    </Droppable>
  );
}
