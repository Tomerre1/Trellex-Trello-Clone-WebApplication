import {boardService} from '../services/board.service';

export const loadBoards =()=> {
    return async (dispatch) => {
        try{
            const boards = await boardService.query()
            // console.log('loading boards',boards)
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

export const loadBoard =(boardId)=> {
    return async (dispatch) => {
        try{
            const board = await boardService.getById(boardId)
            // console.log('loading board',board)
            dispatch({
                type: "SET_BOARD",
                board,
            });

        }
        catch(err){
            console.log('cant set board',err)
        }
    }
}
export const clearBoard =()=> {
    return  (dispatch) => {
            dispatch({
                type: "SET_BOARD",
                board:null
            });
   
    }
}