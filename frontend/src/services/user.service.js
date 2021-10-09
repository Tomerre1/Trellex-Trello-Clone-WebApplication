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
    return user
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
