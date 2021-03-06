import React from "react";
import { connect } from "react-redux";
import { PopoverLabels } from "./PopoverLabels";
import { PopoverMembers } from "./PopoverMembers";
import { PopoverChecklist } from "./PopoverChecklist";
import { PopoverDate } from "./PopoverDate";
import { PopoverAttachment } from "./PopoverAttachment";
import { PopoverCover } from "./PopoverCover";
import { PopoverMoveCopy } from "./PopoverMoveCopy";
import { PopoverMenu } from "./PopoverMenu";
import { PopoverMenuArchive } from "./PopoverMenuArchive";
import { PopoverMenuBackground } from "./PopoverMenuBackground"
import { PopoverNotification } from "./PopoverNotification"
import { PopoverMenuSearchCard } from './PopoverMenuSearchCard'

const _PopoverDynamicCmp = (props) => {
    const { type } = props.popover.pos;
    switch (type) {
        case "LABELS":
            return <PopoverLabels  {...props} title="Labels" />

        case "MEMBERS":
            return <PopoverMembers {...props} title="Members" />

        case "CHECKLIST":
            return <PopoverChecklist {...props} title="Checklist" />

        case "DATE":
            return <PopoverDate {...props} title="Date" />

        case "ATTACHMENT":
            return <PopoverAttachment {...props} title="Attach from..." />

        case "COVER":
            return <PopoverCover {...props} title="Cover" />

        case "MOVE":
            return <PopoverMoveCopy {...props} isCopy={false} title="Move to" />

        case "COPY":
            return <PopoverMoveCopy {...props} isCopy={true} title="Copy" />

        case "BOARD_SHOW_MENU":
            return <PopoverMenu {...props} title="Menu" />

        case "BOARD_SHOW_ARCHIVE":
            return <PopoverMenuArchive {...props} title="Archive" />

        case "BOARD_SHOW_BACKGROUND":
            return <PopoverMenuBackground {...props} title="Change background" />

        case "BOARD_FILTER_CARDS":
            return <PopoverMenuSearchCard {...props} title="Search cards" />

        case "NOTIFICATION":
            return <PopoverNotification {...props} title="Notifications" />

        default:
            return <></>
    }
};

function mapStateToProps(state) {
    return {
        popover: state.appModule.popover,
    };
}

export const PopoverDynamicCmp = connect(
    mapStateToProps,
    null
)(_PopoverDynamicCmp);
