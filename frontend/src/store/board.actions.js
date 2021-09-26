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

export const addBoard = (title = "new board") => {
    return async (dispatch) => {
        const board = { title }
        try {
            const newBoard = await boardService.save(board)
            dispatch({
                type: "ADD_BOARD",
                board: newBoard,
            });

        }
        catch (err) {
            console.log('cant set board', err)
        }
    }
}

export const addTask = (taskTitle, boardId, groupId) => {
    return async (dispatch) => {
        try {
            const board = await boardService.addTask(taskTitle, boardId, groupId)
            dispatch({
                type: "SAVE_BOARD",
                board: board,
            });

        }
        catch (err) {
            console.log('cant add task', err)
        }
    }
}
export const addGroup = (boardId) => {
    return async (dispatch) => {
        try {
            const board = await boardService.addGroup(boardId)
            dispatch({
                type: "SAVE_BOARD",
                board: board,
            });

        } catch (err) {
            console.log('cant add group', err)
        }
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

export const toggleExpandLabels = () => {
    return (dispatch) => {
        dispatch({
            type: "TOGGLE_LABELS",
        });
    }
}

// export const setCurrTaskDetails = (task) => {
//     return (dispatch) => {

//         dispatch({
//             type: "SET_TASK_DETAILS",
//             task
//         });

//     }
// }
export const saveTaskDetails = (board, currGroup, currTask) => {
    return async (dispatch) => {
        try {
            const updatedBoard = boardService.updateTask(board, currGroup, currTask)
            const newBoard = await boardService.save(updatedBoard)
            console.log('newBoard:', newBoard)
            dispatch({
                type: "SAVE_BOARD",
                board: newBoard,
            })


        }
        catch (err) {
            console.log('cant update task details', err)
        }
    }
}

