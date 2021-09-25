import React from "react";

export function TaskLabels(props) {
  const { labelIds, boardLabels } = props;
  return (
    <div>
      <div className="task-labels-container">
        {labelIds && labelIds.map((labelId,idx) => {
          console.log(labelId);
          const label = boardLabels.find((label) => label.id === labelId);
          return (
            <div className="label" style={{ background: label.color }} key={idx}>
              {label.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
