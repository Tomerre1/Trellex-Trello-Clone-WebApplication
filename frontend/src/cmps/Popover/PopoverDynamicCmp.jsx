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
import { PopoverMenuSearchCard } from './PopoverMenuSearchCard'

{/* <button className="secondary-btn action-btn" onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'LABELS' }); togglePopover() }}>
<div className="action-btn-content flex " >
    <LabelIcon />
    <span>Labels</span>
</div>
</button>

<button onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'CHECKLIST' }); }}>
<div>
    <CheckboxIcon />
    <span>Checklist</span>
</div>
</button> */}


// export const setPosition = ({ pos, type}) => {
//     return (dispatch) => {
//         dispatch({
//             type: "SET_POSITION",
//             pos: { ...pos, type },
//         })
//     }
// }



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


// setPopoverPos(elRect) {
//     const { pos } = this.props.popover
//     const { width, height } = elRect
//     let posX = (window.innerWidth - pos.pageX > 200) ? pos.pageX - 200 : pos.pageX - 200;
//     let posY = (window.innerHeight - pos.pageY > 200) ? pos.pageY + 20 : pos.pageY - 200;
//     posX = (posX + width > window.innerWidth) ? window.innerWidth - width - 20 : posX;
//     posY = (posY + height > window.innerHeight) ? window.innerHeight - height - 20 : posY;
//     return { left: posX, top: posY }
// }