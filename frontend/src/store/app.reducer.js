const initialState = {
    currPopover: null,
}
export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_POPOVER':
            return { ...state, currPopover: action.popover }
        default:
            return state
    }
}
