import React from "react";
import { connect } from "react-redux";

import { toggleExpandLabels } from "../../store/board.actions";

function _TaskLabels(props) {
  const { labelIds, boardLabels, areLabelsExpanded, toggleExpandLabels } =
    props
  return (
    <div className="task-labels-container flex">
      {labelIds &&
        labelIds.map((labelId, idx) => {
          const label = boardLabels.find((label) => label.id === labelId);
          if (label){
            return (
              <div
                className={`label flex justify-center ${areLabelsExpanded ? "expanded" : ""
                  }`}
                style={{ background: label.color }}
                key={idx}
                onClick={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  toggleExpandLabels();
                }}
              >
                <span>{label.title}</span>
              </div>
            );} 
            else return null
        })}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    areLabelsExpanded: state.boardModule.areLabelsExpanded,
  };
}

const mapDispatchToProps = {
  toggleExpandLabels,
};
export const TaskLabels = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskLabels);
