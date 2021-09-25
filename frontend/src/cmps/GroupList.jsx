import React from "react";
import { GroupDetails } from "./GroupDetails";
export function GroupList(props) {
  const { groups, boardId, boardLabels } = props;
  return (
    <div className="group-list">
      {groups &&
        groups.map((group, idx) => (
          <GroupDetails
            group={group}
            boardId={boardId}
            key={idx}
            boardLabels={boardLabels}
          />
        ))
        }
      <GroupDetails isAddNew={true} />

    </div>
  );
}
