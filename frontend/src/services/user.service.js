import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const DB_KEY = 'user'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
}


// const gUsers = [
//     {
//         "_id": 'u101',
//         "fullname": 'BCD',
//         "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
//         "username": 'bcd',
//         "password": '1'
//     },
//     {
//         "_id": 'u102',
//         "fullname": 'Tomer',
//         "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg',
//         "username": 'tomer',
//         "password": '1'
//     },
//     {
//         "_id": 'u103',
//         "fullname": 'Matan',
//         "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew',
//         "username": 'matan',
//         "password": '1'
//     },
// ]
async function getUsers() {
    const users = httpService.get('user')
    return users
}


async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)

}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)

}
async function logout() {
    return await httpService.post('auth/logout')

}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}
