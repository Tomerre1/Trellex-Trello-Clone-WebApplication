import React, { Component } from 'react';
import { connect } from "react-redux";
import { TodoList } from './TodoList'
import { CheckDeletePopover } from './CheckDeletePopover'
import { TodoAdd } from './TodoAdd'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ProgressBar } from './ProgressBar'
import { saveBoard, saveTaskDetails } from '../store/board.actions'
import { togglePopover } from '../store/app.actions'
import { setPosition } from '../store/app.actions';


export class _TaskChecklistPreview extends Component {

    state = {
        isPopover: false,
        currentTarget: null
    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        this.setState(prevState => ({ ...prevState, currGroup }))
    }

    togglePopover = () => {
        this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
    }

    setCurrentTarget = (event) => {
        this.setState(prevState => ({ ...prevState, currentTarget: event }))
        this.togglePopover()
    };

    onSaveTodo = async (todo) => {
        const { board, currTaskDetails, checklist, saveTaskDetails } = this.props
        const { currGroup } = this.state
        const checklistIdx = currTaskDetails.checklists.indexOf(checklist)
        const todoIdx = currTaskDetails.checklists[checklistIdx].todos.findIndex((currTodo) => {
            return currTodo.id === todo.id
        })
        currTaskDetails.checklists[checklistIdx].todos[todoIdx] = todo
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    onRemoveTodo = async (todo) => {
        const { board, currTaskDetails, saveTaskDetails, checklist } = this.props
        const { currGroup } = this.state
        const checklistIdx = currTaskDetails.checklists.indexOf(checklist)
        const todoIdx = currTaskDetails.checklists[checklistIdx].todos.findIndex((currTodo) => {
            return currTodo.id === todo.id
        })
        currTaskDetails.checklists[checklistIdx].todos.splice(todoIdx, 1)
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    addTodo = async (todo) => {
        const { board, currTaskDetails, saveTaskDetails, checklist } = this.props
        const { currGroup } = this.state
        const checklistIdx = currTaskDetails.checklists.indexOf(checklist)
        currTaskDetails.checklists[checklistIdx].todos.push(todo)
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
        // const { saveTaskDetails, currTaskDetails, addActivity, checklist } = this.props
        const { board, saveTaskDetails, currTaskDetails, checklist } = this.props
        const { currGroup } = this.state
        const checklistIdx = currTaskDetails.checklists.indexOf(checklist)
        currTaskDetails.checklists.splice(checklistIdx, 1)
        await saveTaskDetails(board, currGroup, currTaskDetails)
        this.togglePopover()
        // addActivity('remove-checklist')
    }

    render() {
        // const { checklist, addActivity } = this.props
        const { checklist } = this.props
        const { isPopover, currentTarget } = this.state

        return (
            <div className="task-activities flex column">
                <div className="window-modal-title flex space-between">
                    <div className="task-activities-header flex align-center">
                        <CheckBoxOutlinedIcon />
                        <h3>{checklist.title}</h3>
                    </div>
                    <button className="activity-toggle-btn" onClick={(event) => { this.props.setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'CHECK_DELETE' }) }}>
                        Delete
                    </button>
                </div>
                <ProgressBar doneTodosCalc={this.doneTodosCalc} />
                <TodoList
                    todos={checklist.todos}
                    onSaveTodo={this.onSaveTodo}
                    onRemoveTodo={this.onRemoveTodo}
                    // addActivity={addActivity}
                />
                {isPopover &&
                    <CheckDeletePopover
                        remove={this.removeChecklist}
                        type={'checklist'}
                        typeTitle={checklist.title}
                        togglePopover={this.togglePopover}
                        currentTarget={currentTarget}
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
    };
}
const mapDispatchToProps = {
    saveTaskDetails,
    saveBoard,
    togglePopover,
    setPosition,
};

export const TaskChecklistPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TaskChecklistPreview);