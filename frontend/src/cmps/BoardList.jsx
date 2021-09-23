import React from 'react'
import {BoardPreview} from './BoardPreview'
export function BoardList(props) {
    const {boards} = props
    return (
        <div className="board-list">
            {boards &&  boards.map((board,idx)=> <BoardPreview board={board} key={idx}/>)}
        </div>
    )
}
