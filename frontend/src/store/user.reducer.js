import { userService } from '../services/user.service.js'


const initialState = {
    loggedinUser:userService.getLoggedinUser(),
    users: [],
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, loggedinUser: action.user }
            break;

        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;

        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;

}
