import React from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { TaskMenuPreview } from "../TaskPreview/TaskMenuPreview"
import { setPosition } from '../../store/app.actions'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function _PopoverMenuArchive({ board, setPosition }) {
    let tasks = board.groups.map(group => group.tasks).flat()
    tasks = tasks.filter(task => task.isArchive)

    return <div className="board-menu">
        <Popover title='Archive'>
            <div className="pop-over-archive">
                <span
                    className="back"
                    onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'BOARD_SHOW_MENU' }) }}>
                    <ArrowBackIosIcon />
                </span>
                <div className="card-preview-container">
                    {tasks.map(task => {
                        const taskGroup = board.groups.find(group => group.tasks.some(currTask => currTask.id === task.id));
                        return <TaskMenuPreview
                            task={task}
                            id={task.id}
                            key={task.id}
                            index={task.orgIdx}
                            groupId={taskGroup.id}
                            boardId={board._id}
                            boardLabels={board.labels}
                            taskUrl={`/board/${board._id}/${taskGroup.id}/${task.id}`}
                        />
                    })}
                </div>
            </div>
        </Popover>
    </div>
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board,

    }
}
const mapDispatchToProps = {
    setPosition
};

export const PopoverMenuArchive = connect(mapStateToProps, mapDispatchToProps)(_PopoverMenuArchive)
