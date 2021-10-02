const initialState = {
    currTaskDetails: null,
    isDragDisabled: false,
    popover: {
        pos: {
            posX: null,
            posY: null,
            type: ''
        },
        isOpen: false,
    }
}
export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TASK_DETAILS':
            return { ...state, currTaskDetails: { ...action.currTaskDetails } }
        case 'TOGGLE_DRAGGING':
            return { ...state, isDragDisabled: !state.isDragDisabled }
        case 'SET_POSITION':
            return { ...state, popover: { ...state.popover, pos: action.pos } }
        case 'TOOGLE_POPOVER':
            return { ...state, popover: { ...state.popover, isOpen: !state.popover.isOpen } }
        default:
            return state
    }
}
