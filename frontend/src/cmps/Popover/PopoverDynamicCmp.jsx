import { connect } from "react-redux";
import React, { Component } from "react";
import { PopoverLabels } from "./PopoverLabels";
import { PopoverMembers } from "./PopoverMembers";
import { PopoverChecklist } from "./PopoverChecklist";
import { PopoverDate } from "./PopoverDate";
import { PopoverAttachment } from "./PopoverAttachment";
import { PopoverCover } from "./PopoverCover";
import { PopoverMoveCopy } from "./PopoverMoveCopy";
import { saveBoard, saveTaskDetails } from "../../store/board.actions";
const _PopoverDynamicCmp = (props) => {
    const { type } = props.popover.pos;
    switch (type) {
        case "LABELS":
            return (
                <PopoverLabels
                    {...props}
                    title="Labels"
                />
            );
        case "MEMBERS":
            return (
                <PopoverMembers
                    {...props}
                    title="Members"

                />
            );
        case "CHECKLIST":
            return (
                <PopoverChecklist
                    {...props}
                    title="Checklist"
                />
            );
        case "DATE":
            return (
                <PopoverDate
                    {...props}
                    title="Date"
                    // setSelectedDate={this.setSelectedDate}
                />
            );
        // case "ATTACHMENT":
        //     return <PopoverAttachment {...props} title="Attach from..." />;
        case "COVER":
            return (
                <PopoverCover
                    {...props}
                    title="Cover"
                />
            );
        // case "MOVE":
        //     return (
        //         <PopoverMoveCopy
        //             {...props}
        //             isCopy={false}
        //             updateBoards={this.updateBoards}
        //             boards={boards}
        //             board={board}
        //             currGroup={currGroup}
        //             title="Move to"
        //         />
        //     );
        // case "COPY":
        //     return (
        //         <PopoverMoveCopy
        //             {...props}
        //             isCopy={true}
        //             updateBoards={this.updateBoards}
        //             boards={boards}
        //             board={board}
        //             currGroup={currGroup}
        //             title="Copy"
        //         />
        //     );
        default:
            return ''
    }
};
function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        popover: state.appModule.popover,
    };
}
const mapDispatchToProps = {
    saveBoard,
    saveTaskDetails,
};

export const PopoverDynamicCmp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PopoverDynamicCmp);
