import React from "react";
import { GroupDetails } from "./GroupDetails";
export function GroupList(props) {
  const { groups, boardId } = props;
  return (
    <div className="group-list">
      {groups &&
        groups.map((group, idx) => (
          <GroupDetails group={group} boardId={boardId} key={idx} />
        ))}
      <GroupDetails isAddNew={true} />
    </div>
  );
}
