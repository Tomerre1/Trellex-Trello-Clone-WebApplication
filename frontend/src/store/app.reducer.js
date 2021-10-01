const initialState = {
    currTaskDetails: null,
    isDragDisabled:false,
}
export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TASK_DETAILS':
            return { ...state, currTaskDetails: { ...action.currTaskDetails } }
        case 'TOGGLE_DRAGGING':
            return { ...state, isDragDisabled: !state.isDragDisabled }
        default:
            return state
    }
}
