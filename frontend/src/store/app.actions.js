import { boardService } from '../services/board.service';
import { socketService } from '../services/socket.service'

export const setCurrTaskDetails = (currTaskDetails) => {
    return async (dispatch) => {
        // await boardService.updateTask(board, group, currTaskDetails)
        dispatch({
            type: "SET_TASK_DETAILS",
            currTaskDetails
        });
    }
}


export const toggleDragDisable = () => {
    return (dispatch) => {
        dispatch({
            type: "TOGGLE_DRAGGING",
        });
    }
}
export const setPosition = ({ pos, type}) => {
    return (dispatch) => {
        dispatch({
            type: "SET_POSITION",
            pos: { ...pos, type },
        })
    }
}

export const togglePopover = () => {
    return (dispatch) => {
        dispatch({
            type: "TOGGLE_POPOVER",
        });
    }
}
export const setPopover = (isOpen) => {
    return (dispatch) => {
        dispatch({
            type: "SET_POPOVER",
            isOpen
        });
    }
}
export const setPopoverMenu = (isMenu) => {
    return (dispatch) => {
        dispatch({
            type: "SET_POPOVER_MENU",
            isMenu
        });
    }
}
