import { boardService } from '../services/board.service';
import { socketService } from '../services/socket.service'

export const loadBoards = () => {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
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

export const loadBoard = (boardId, filterBy = null) => {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId, filterBy)
            if (board)
                dispatch({
                    type: "SET_BOARD",
                    board,
                });

        }
        catch (err) {
            console.log('cant set board', err)
            throw Error(err)
        }
    }
}

export const setBoard = (board) => {
    return (dispatch) => {
        dispatch({
            type: "SET_BOARD",
            board,
        });
    }
}




export const saveBoard = (board) => {
    return async (dispatch) => {
        try {

            dispatch({
                type: "SAVE_BOARD",
                board: board,
            });
            await boardService.save(board)
        }
        catch (err) {
            console.log('cant save board', err)
            throw err
        }
    }
}

export const addBoard = (title = "new board", bgClr = "black", bgImg) => {
    return async (dispatch) => {
        const board = { title, style: { bgClr, bgImg } }
        try {
            const newBoard = await boardService.save(board)
            dispatch({
                type: "ADD_BOARD",
                board: newBoard,
            });
            return newBoard
        }
        catch (err) {
            console.log('cant add board', err)
        }
    }
}

export const handleDrag = (
    board,
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return async (dispatch) => {
        const tempBoard = JSON.parse(JSON.stringify(board))
        if (type === 'group') {
            const group = tempBoard.groups.splice(droppableIndexStart, 1)
            tempBoard.groups.splice(droppableIndexEnd, 0, ...group)
        } else {
            if (droppableIdStart === droppableIdEnd) {
                const group = tempBoard.groups.find(group => group.id === droppableIdStart)
                const task = group.tasks.splice(droppableIndexStart, 1)
                group.tasks.splice(droppableIndexEnd, 0, ...task)
            }
            if (droppableIdStart !== droppableIdEnd) {
                const groupStart = tempBoard.groups.find(group => group.id === droppableIdStart)
                const task = groupStart.tasks.splice(droppableIndexStart, 1)
                const groupEnd = tempBoard.groups.find(group => group.id === droppableIdEnd)
                groupEnd.tasks.splice(droppableIndexEnd, 0, ...task)
            }
        }
        // socketService.emit("board-change", tempBoard)
        dispatch({
            type: "SAVE_BOARD",
            board: tempBoard
        });
        boardService.save(tempBoard)
        return
    }

}

export const removeBoard = (boardId) => {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            dispatch({
                type: "REMOVE_BOARD",
                boardId: boardId,
            });

        }
        catch (err) {
            console.log('cant remove board', err)
        }
    }
}
export const addTask = (taskTitle, boardId, groupId, audioUrl = null, videoUrl = null) => {
    return async (dispatch) => {
        try {
            const board = await boardService.addTask(taskTitle, boardId, groupId, audioUrl, videoUrl)
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
export const removeTask = (boardId, groupId, taskId) => {
    return async (dispatch) => {
        try {
            const board = await boardService.removeTask(boardId, groupId, taskId)
            dispatch({
                type: "SAVE_BOARD",
                board: board,
            });

        }
        catch (err) {
            console.log('cant remove task', err)
        }
    }
}

export const addGroup = (boardId, title) => {
    return async (dispatch) => {
        try {
            const board = await boardService.addGroup(boardId, title)
            dispatch({
                type: "SAVE_BOARD",
                board: board,
            });

        } catch (err) {
            console.log('cant add group', err)
        }
    }
}

export const removeGroup = (boardId, groupId) => {
    return async (dispatch) => {
        try {
            const board = await boardService.removeGroup(boardId, groupId)
            dispatch({
                type: "SAVE_BOARD",
                board: board,
            });

        } catch (err) {
            console.log('cant remove group', err)
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

export const addActivity = (board, currTaskDetails, activityType, txt = null) => {
    return async (dispatch) => {
        try {
            board.activities.push(boardService.createActivity(activityType, currTaskDetails, txt))
            const newBoard = await boardService.save(board)
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

export const saveTaskDetails = (board, currGroup, currTask) => {
    return async (dispatch) => {
        try {
            const updatedBoard = boardService.updateTask(board, currGroup, currTask)
            dispatch({
                type: "SAVE_BOARD",
                board: updatedBoard,
            })
            await boardService.save(updatedBoard)
        }
        catch (err) {
            console.log('cant update task details', err)
        }
    }
}

export const updateTask = (boardId, groupId, task) => {
    return async (dispatch) => {
        try {
            const updatedBoard = await boardService.updateTaskByIds(boardId, groupId, task)
            const newBoard = await boardService.save(updatedBoard)
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

export const setFilterBy = (filterBy) => {
    return (dispatch) => {
        dispatch({
            type: "SET_FILTER",
            filterBy
        });
    }
}