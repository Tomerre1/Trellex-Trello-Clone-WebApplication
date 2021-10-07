
import { socketService } from '../services/socket.service'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service'
import axios from 'axios'

const APP_ID = 'IwjSlLYB-kEXeOlDvuifDixGryX1CK64CwapeKeJC8w'
const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    // remove,
    updateTask,
    addTask,
    removeTask,
    addGroup,
    removeGroup,
    createActivity,
    updateTaskByIds,
    queryPhotos
}

async function query() {
    // const res = await axios.get('http://localhost:3030/api/toy', { params: filterBy })
    // return res.data
    const boards = await httpService.get('board')
    return boards
}
// async function query() {
//     let boards = await storageService.query(STORAGE_KEY)
//     if (boards.length) return boards
//     console.log('no local storage found')
//     localStorage.setItem('board', JSON.stringify(demoBoards))
//     return demoBoards
// }

async function queryPhotos(query = 'random') {
    const photos = await axios.get(`https://api.unsplash.com/search/photos/?query=${query}&client_id=${APP_ID}`)
    return photos.data.results
}

// function getById(boardId) {
//     return storageService.get(STORAGE_KEY, boardId)
// }
async function getById(boardId) {
    // const res = await axios.get(`http://localhost:3030/api/toy/${toyId}`)
    // return res.data
    const board = await httpService.get(`board/${boardId}`)
    return board
}



// async function remove(boardId) {
//     try {
//         return storageService.remove(STORAGE_KEY, boardId)
//     } catch (err) {
//         console.log('couldnt remove board', err)
//     }
// }

async function save(board) {
    if (board._id) {
        const updatedBoard = await httpService.put('board', board)
        socketService.emit("board-change")
        return updatedBoard
        // return storageService.put(STORAGE_KEY, board)
    } else {
        const newBoard = {
            "title": board.title,
            "createdAt": Date.now(),
            "createdBy": userService.getLoggedinUser(),
            "groups": [],
            "tasks": [],
            "labels": [],
            "activities": [],
            "members": [],
            "style": {
                "bgClr": board.style.bgClr,
                "bgImg": board.style.bgImg
            },
        }
        const savedBoard = await httpService.post('board', newBoard)
        socketService.emit("board-change")
        return savedBoard
        // return storageService.post(STORAGE_KEY, newBoard)
    }
}


function createActivity(activityType, currTask, txt = null) {
    const task = {
        id: currTask.id,
        title: currTask.title
    }
    const activity = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
        task,
        type: activityType,
        txt
    }
    return activity
}

function updateTask(board, group, task) {
    const groupNeedToUpdate = board.groups.find(currGroup => currGroup.id === group.id)
    const groupIndex = board.groups.indexOf(groupNeedToUpdate)
    const taskNeedToUpdate = board.groups[groupIndex].tasks.find(currTask => currTask.id === task.id)
    const taskIndex = board.groups[groupIndex].tasks.indexOf(taskNeedToUpdate)
    board.groups[groupIndex].tasks[taskIndex] = task
    return { ...board }
}



async function addTask(taskTitle, boardId, groupId, audioUrl, videoUrl) {
    if (!taskTitle)
        return
    const newTask =
    {
        "id": `t-${utilService.makeId()}`,
        "title": taskTitle,
        "description": "",
        "createdAt": Date.now(),
        "byMember": userService.getLoggedinUser(),
        "style": {},
        "labelIds": [],
        "members": [],
    }
    if (audioUrl) newTask.audioUrl = audioUrl
    else if (videoUrl) newTask.videoUrl = videoUrl

    const board = await getById(boardId)
    const idx = board.groups.findIndex((group) => group.id === groupId)
    board.groups[idx].tasks.push(newTask)
    save(board)
    return board
}

async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => groupId === group.id)
        board.groups[groupIdx].tasks = board.groups[groupIdx].tasks.filter(task => taskId !== task.id)
        save(board)
        return board
    }

    catch (err) {
        console.log(err)
    }

}

async function addGroup(boardId, title = "Untitled group") {
    if (!boardId) return
    const newGroup = {
        "id": `g-${utilService.makeId()}`,
        "title": title,
        tasks: [],
        "style": {
            bgImg: "",
            bgClr: ""
        }
    }
    try {
        const board = await getById(boardId)
        board.groups.push(newGroup)
        save(board)

        return board
    }
    catch (err) {
        console.log('couldnt add group', err)
    }
}

async function removeGroup(boardId, groupId) {
    try {
        const board = await getById(boardId)
        board.groups = board.groups.filter(group => group.id !== groupId)
        save(board)
        return board
    }

    catch (err) {
        console.log(err)
    }

}
async function updateTaskByIds(boardId, groupId, task) {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(group => groupId === group.id)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(taskToFind => taskToFind.id === task.id)
    board.groups[groupIdx].tasks[taskIdx] = task
    save(board)
    return board

}

