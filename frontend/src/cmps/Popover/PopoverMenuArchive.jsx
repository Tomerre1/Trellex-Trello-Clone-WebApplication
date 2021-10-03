import React, { Component } from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { TaskPreview } from "../TaskPreview"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



class _PopoverMenuArchive extends React.Component {
    static
    state = {

    }
 
    render() {
        const { board } = this.props
        let tasks = board.groups.map(group => group.tasks).flat()
        console.log('%c  tasks:', 'color: #00000;background: #aaefe5;', tasks);
        tasks = tasks.filter(task => task.isArchive)
        console.log('%c  tasks:', 'color: #00000;background: #aaefe5;', tasks);

        // const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))

        return <div className="board-menu">
            <Popover title='Archive'>
                <div class="pop-over-archive">
                    <span class="back"><ArrowBackIosIcon /></span>
                    <div class="card-preview-container">
                        {tasks.map(task => {
                            console.log('%c  task:', 'color: #00000;background: #aaefe5;', task);
                            const taskGroup = board.groups.find(group => group.tasks.some(currTask => currTask.id === task.id));
                            console.log('%c  taskGroup:', 'color: #00000;background: #aaefe5;', taskGroup);
                            return <TaskPreview
                                task={task}
                                id={task.id}
                                key={task.id}
                                index={task.orgIdx}
                                groupId={taskGroup.id}
                                boardId={board.id}
                                boardLabels={board.labels}
                                taskUrl={`/board/${board.id}/${taskGroup.id}/${task.id}`}
                            />
                        })}
                    </div>
                </div>
            </Popover>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,

    }
}

export const PopoverMenuArchive = connect(mapStateToProps, null)(_PopoverMenuArchive)
