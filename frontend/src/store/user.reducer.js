import { userService } from '../services/user.service.js'


const initialState = {
    loggedinUser:  {
        "_id": 'u101',
        "fullname": 'BCD',
        "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
    },
    users:[],
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
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
