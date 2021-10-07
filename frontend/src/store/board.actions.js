import { boardService } from '../services/board.service';
import { socketService } from '../services/socket.service'

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

export const loadBoard = (boardId, filterBy = null) => {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId, filterBy)
            // console.log('loading board',board)
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


export const saveBoard = (board) => {
    return async (dispatch) => {
        try {
            const newBoard = await boardService.save(board)
            dispatch({
                type: "SAVE_BOARD",
                board: newBoard,
            });
            socketService.emit("board-change")
        }
        catch (err) {
            console.log('cant save board', err)
            // throw Error(err)
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
        //drag group
        if (type === 'group') {
            const group = tempBoard.groups.splice(droppableIndexStart, 1)
            tempBoard.groups.splice(droppableIndexEnd, 0, ...group)
        } else {
            if (droppableIdStart === droppableIdEnd) {
                const group = tempBoard.groups.find(group => group.id === droppableIdStart)
                const task = group.tasks.splice(droppableIndexStart, 1)
                group.tasks.splice(droppableIndexEnd, 0, ...task)
            }
            // different group target
            if (droppableIdStart !== droppableIdEnd) {
                // source group
                const groupStart = tempBoard.groups.find(group => group.id === droppableIdStart)
                const task = groupStart.tasks.splice(droppableIndexStart, 1)
                // target group
                const groupEnd = tempBoard.groups.find(group => group.id === droppableIdEnd)
                groupEnd.tasks.splice(droppableIndexEnd, 0, ...task)
            }
        }
        // same group drag
        boardService.save(tempBoard)
        dispatch({
            type: "SAVE_BOARD",
            board: tempBoard
        });

        return
    }

}

export const removeBoard = (boardId) => {
    return async (dispatch) => {
        try {
            const board = await boardService.remove(boardId)
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
export const addTask = (taskTitle, boardId, groupId,audioUrl,videoUrl) => {
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
    console.log(groupId, boardId)
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

            // dispatch({
            //     type: "SET_TASK_DETAILS",
            //     currTaskDetails: currTask
            // });
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

export const setFilterBy = (filterBy) => {
    return (dispatch) => {
        dispatch({
            type: "SET_FILTER",
            filterBy
        });
    }
}