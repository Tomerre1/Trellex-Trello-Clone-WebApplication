import { boardService } from '../services/board.service';

export const loadBoards = () => {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            // console.log('loading boards',boards)
            dispatch({
                type: "SET_BOARDS",
                boards,
            });

        }
        catch (err) {
            console.log('cant set boards', err)
        }
    }
}

export const loadBoard = (boardId) => {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            // console.log('loading board',board)
            dispatch({
                type: "SET_BOARD",
                board,
            });

        }
        catch (err) {
            console.log('cant set board', err)
        }
    }
}

export const saveBoard = (board) => {
    return async (dispatch) => {
        try {
            const newBoard = await boardService.save(board)
            console.log('newBoard:', newBoard)
            dispatch({
                type: "SAVE_BOARD",
                board: newBoard,
            });

        }
        catch (err) {
            console.log('cant set board', err)
        }
    }
}
export const addTask = (taskTitle,boardId,groupId) =>{
    return async(dispatch) => {
     const board = await boardService.addTask(taskTitle, boardId, groupId)
     dispatch({
        type: "SAVE_BOARD",
        board: board,
    });
    }
}

export const clearBoard = () => {
    return (dispatch) => {
        dispatch({
            type: "SET_BOARD",
            board: null
        });

    }
}