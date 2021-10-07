const initialState = {
    boards: [],
    board: null,
    filterBy: {
        search: '',
        labels: [],
        members: []
    },
    areLabelsExpanded: false
}
export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    // var board
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'SAVE_BOARD':
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards, board: { ...action.board } }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
            break
        case 'REMOVE_BOARD':
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards }
            break
        case 'TOGGLE_LABELS':
            newState = { ...state, areLabelsExpanded: !state.areLabelsExpanded }
            break

        // case 'UNDO_REMOVE_BOARD':
        //     if (state.lastRemovedBoard) {
        //         newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null}
        //     }
        //     break
        default:
    }
    // For debug:
    // console.log('Prev State:', state)
    console.log('Action:', action)
    console.log('New State:', newState)
    return newState

}
