const initialState = {
    currTaskDetails: null,
    isAppOverlay:false,
}
export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TASK_DETAILS':
            return { ...state, currTaskDetails: { ...action.currTaskDetails } }
        case 'TOGGLE_OVERLAY':
            return { ...state, isAppOverlay: !state.isAppOverlay }
        default:
            return state
    }
}
