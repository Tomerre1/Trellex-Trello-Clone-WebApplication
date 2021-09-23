import {boardService} from '../services/board.service';

export const loadBoards =()=> {
    return async (dispatch) => {
        try{
            const boards = await boardService.query()
            console.log('board action',boards)
            dispatch({
                type: "SET_BOARDS",
                boards,
            });

        }
        catch(err){
            console.log('cant set boards',err)
        }
    }
}