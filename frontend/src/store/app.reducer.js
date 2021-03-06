const initialState = {
    currTaskDetails: null,
    isDragDisabled: false,
    popover: {
        pos: {
            posX: -1,
            posY: -1,
            type: ''
        },
        isOpen: false,
        isMenu: false
    }
}
export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TASK_DETAILS':
            return { ...state, currTaskDetails: { ...action.currTaskDetails } }
        case 'TOGGLE_DRAGGING':
            return { ...state, isDragDisabled: !state.isDragDisabled }
        case 'SET_POSITION':
            const popover = { ...state.popover, pos: { ...action.pos } }
            // const popoverDeepCopy = JSON.parse(JSON.stringify(popover))
            return { ...state, popover }
        case 'TOGGLE_POPOVER':
            return { ...state, popover: { ...state.popover, isOpen: !state.popover.isOpen } }
        case 'SET_POPOVER':
            return { ...state, popover: { ...state.popover, isOpen: action.isOpen } }
        case 'SET_POPOVER_MENU':
            return { ...state, popover: { ...state.popover, isOpen: false, isMenu: action.isMenu } }
        default:
            return state
    }
}
