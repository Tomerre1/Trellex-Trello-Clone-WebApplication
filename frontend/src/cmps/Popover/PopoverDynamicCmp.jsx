import { connect } from "react-redux";
import React from "react";
import { PopoverLabels } from "./PopoverLabels";
import { PopoverMembers } from "./PopoverMembers";
import { PopoverChecklist } from "./PopoverChecklist";
import { PopoverDate } from "./PopoverDate";
import { PopoverAttachment } from "./PopoverAttachment";
import { PopoverCover } from "./PopoverCover";
import { PopoverMoveCopy } from "./PopoverMoveCopy";
import { CheckDeletePopover } from "../CheckDeletePopover";
const _PopoverDynamicCmp = (props) => {
    const { type } = props.popover.pos;
    console.log(props.popover)
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
        case "MOVE":
            return (
                <PopoverMoveCopy
                    {...props}
                    isCopy={false}
                    title="Move to"
                />
            );
        case "COPY":
            return (
                <PopoverMoveCopy
                    {...props}
                    isCopy={true}
                    title="Copy"
                />
            );
        case "CHECK_DELETE_CHECKLIST":
            return (
                <CheckDeletePopover
                    {...props}
                />
            );
        default:
            return <></>
    }
};
function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        popover: state.appModule.popover,
    };
}

export const PopoverDynamicCmp = connect(
    mapStateToProps,
    null
)(_PopoverDynamicCmp);
