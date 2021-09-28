import React from 'react'
import {BoardPreview} from './BoardPreview'
import {BoardPreviewAdd} from './BoardPreviewAdd'
export function BoardList(props) {
    const {boards,onAdd} = props
    return (
        <div className="board-list">
            {boards &&  boards.map((board,idx)=> <BoardPreview board={board} key={idx} />)}
            <BoardPreviewAdd onAdd={onAdd}/>
        </div>
    )
}
