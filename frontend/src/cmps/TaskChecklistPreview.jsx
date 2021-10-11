import React, { Component } from 'react';
import { connect } from "react-redux";
import { TodoList } from './TodoList'
import { CheckDeletePopover } from './CheckDeletePopover'
import { TodoAdd } from './TodoAdd'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ProgressBar } from './ProgressBar'
import { saveBoard, saveTaskDetails, addActivity } from '../store/board.actions'
import { togglePopover } from '../store/app.actions'
import { setPosition, setPopover, setCurrTaskDetails } from '../store/app.actions';

export class _TaskChecklistPreview extends Component {

    state = {
        isPopover: false
    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        this.setState(prevState => ({ ...prevState, currGroup }))
    }

    togglePopover = () => {
        this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
    }

    onSaveTodo = async (todo) => {
        const { board, currTaskDetails, checklist, saveTaskDetails, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        const checklistIdx = currTaskDetails.checklists.indexOf(checklist)
        const todoIdx = currTaskDetails.checklists[checklistIdx].todos.findIndex((currTodo) => {
            return currTodo.id === todo.id
        })
        currTaskDetails.checklists[checklistIdx].todos[todoIdx] = todo
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    onRemoveTodo = async (todo) => {
        const { board, currTaskDetails, saveTaskDetails, checklist, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        const checklistIdx = currTaskDetails.checklists.indexOf(checklist)
        const todoIdx = currTaskDetails.checklists[checklistIdx].todos.findIndex((currTodo) => {
            return currTodo.id === todo.id
        })
        currTaskDetails.checklists[checklistIdx].todos.splice(todoIdx, 1)
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    addTodo = async (todo) => {
        const { board, currTaskDetails, saveTaskDetails, checklist, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        const checklistIdx = currTaskDetails.checklists.indexOf(checklist)
        currTaskDetails.checklists[checklistIdx].todos.push(todo)
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    doneTodosCalc = () => {
        const { checklist } = this.props
        const { todos } = checklist
        if (!todos.length) return 0

        let isDoneTodos = 0
        todos.forEach(todo => {
            if (todo.isDone) isDoneTodos++
        })
        return (isDoneTodos / checklist.todos.length) * 100
    }

    removeChecklist = async () => {
        const { board, saveTaskDetails, currTaskDetails, checklist, addActivity, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        const checklistIdx = currTaskDetails.checklists.indexOf(checklist)
        currTaskDetails.checklists.splice(checklistIdx, 1)
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
        this.togglePopover()
        await addActivity(board, currTaskDetails, 'remove-checklist')
    }

    render() {
        const { checklist, popover } = this.props
        const { isPopover } = this.state
        if (!checklist) return <div></div>

        return (
            <div className="task-activities flex column">
                <div className="window-modal-title flex space-between">
                    <div className="task-activities-header flex align-center">
                        <CheckBoxOutlinedIcon />
                        <h3>{checklist.title}</h3>
                    </div>
                    <button className="activity-toggle-btn" onClick={(event) => {
                        this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: '' });
                        this.props.setPopover(true)
                        this.togglePopover()
                    }}>
                        Delete
                    </button>
                </div>
                <ProgressBar doneTodosCalc={this.doneTodosCalc} />
                <TodoList
                    todos={checklist.todos}
                    onSaveTodo={this.onSaveTodo}
                    onRemoveTodo={this.onRemoveTodo}
                />
                {popover.isOpen && isPopover &&
                    <CheckDeletePopover
                        remove={this.removeChecklist}
                        type={'checklist'}
                        typeTitle={checklist.title}
                        togglePopover={this.togglePopover}
                    />
                }
                <TodoAdd addTodo={this.addTodo} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
        popover: state.appModule.popover,
    };
}
const mapDispatchToProps = {
    saveTaskDetails,
    saveBoard,
    togglePopover,
    setPosition,
    setPopover,
    addActivity,
    setCurrTaskDetails
};

export const TaskChecklistPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TaskChecklistPreview);