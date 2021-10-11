import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { setCurrTaskDetails, togglePopover } from '../../store/app.actions'
import { saveBoard } from '../../store/board.actions'
export class _PopoverMoveCopy extends Component {
    state = {
        selectedGroup: null,
        selectedBoard: null,
        selectedPosition: null,
        taskTitle: ''

    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        const task = currGroup.tasks.find(task => currTaskDetails.id === task.id)
        const selectedPosition = currGroup.tasks.indexOf(task)
        this.setState(prevState => ({
            ...prevState,
            selectedBoard: board,
            selectedGroup: currGroup,
            selectedPosition,
            taskTitle: currTaskDetails.title,
            currGroup
        }))
    }

    handleChange = (e) => {
        const { value, name } = e.target
        this.setState(prevState => ({ ...prevState, [name]: value }))
    }

    handleBoardChange = (e) => {
        const { value } = e.target
        const { boards } = this.props
        const selectedBoard = boards.find(board => board._id === value)
        this.setState(prevState => ({ ...prevState, selectedBoard }))
    }

    handleGroupChange = (e) => {
        const { value } = e.target
        const { selectedBoard } = this.state
        const selectedGroup = selectedBoard.groups.find(group => group.id === value)
        this.setState(prevState => ({ ...prevState, selectedGroup }))
    }


    submitMoveSameBoard = async () => {
        const { selectedBoard, selectedGroup, selectedPosition, taskTitle, currGroup } = this.state
        const { currTaskDetails, saveBoard, isCopy, togglePopover } = this.props
        const fromGroup = selectedBoard.groups.find(group => group.id === currGroup.id)
        const fromGroupIdx = selectedBoard.groups.indexOf(fromGroup)
        const fromTask = selectedBoard.groups[fromGroupIdx].tasks.find(task => task.id === currTaskDetails.id)
        const fromTaskIdx = selectedBoard.groups[fromGroupIdx].tasks.indexOf(fromTask)
        const task = (isCopy) ? { ...currTaskDetails, id: utilService.makeId(), title: taskTitle } :
            selectedBoard.groups[fromGroupIdx].tasks.splice(fromTaskIdx, 1)
        const toGroupIdx = selectedBoard.groups.indexOf(selectedGroup)
        selectedBoard.groups[toGroupIdx].tasks.splice(selectedPosition, 0, isCopy ? task : task[0])
        this.setState(prevState => ({ ...prevState, currGroup: selectedGroup }))
        togglePopover()
        await saveBoard(selectedBoard);
    }

    submitMoveAnotherBoard = async () => {
        const { selectedBoard, selectedGroup, selectedPosition, taskTitle, currGroup } = this.state
        const { currTaskDetails, saveBoard, board, boards, isCopy, togglePopover } = this.props
        const currBoard = boards.find(currBoard => currBoard._id === board._id)
        const fromBoardIdx = boards.indexOf(currBoard)
        const fromGroup = boards[fromBoardIdx].groups.find(group => group.id === currGroup.id)
        const fromGroupIdx = boards[fromBoardIdx].groups.indexOf(fromGroup)
        const fromTask = boards[fromBoardIdx].groups[fromGroupIdx].tasks.find(task => task.id === currTaskDetails.id)
        const fromTaskIdx = boards[fromBoardIdx].groups[fromGroupIdx].tasks.indexOf(fromTask)
        const task = (isCopy) ? { ...currTaskDetails, id: utilService.makeId(), title: taskTitle } : boards[fromBoardIdx].groups[fromGroupIdx].tasks.splice(fromTaskIdx, 1)

        const toBoardIdx = boards.indexOf(selectedBoard)
        const toGroup = boards[toBoardIdx].groups.find(group => group.id === selectedGroup.id)
        const toGroupIdx = boards[toBoardIdx].groups.indexOf(toGroup)
        boards[toBoardIdx].groups[toGroupIdx].tasks.splice(selectedPosition, 0, isCopy ? task : task[0])
        this.setState(prevState => ({ ...prevState, currGroup: selectedGroup, selectedBoard: boards[toBoardIdx] }))
        togglePopover()
        await saveBoard(boards[fromBoardIdx])
        await saveBoard(boards[toBoardIdx])


    }

    onSubmit = () => {
        const { selectedBoard, selectedGroup, taskTitle } = this.state
        const { board } = this.props
        if (!selectedBoard || !selectedGroup || !taskTitle) return
        if (board._id !== selectedBoard._id) this.submitMoveAnotherBoard()
        else this.submitMoveSameBoard()
    }

    render() {
        const { title, boards, isCopy } = this.props
        const { selectedBoard, selectedGroup, selectedPosition, taskTitle } = this.state
        if (!(selectedBoard)) return <></>
        return (
            <Popover title={title} >
                <div className="popover-move-content">
                    {isCopy && <>
                        <label>Title</label>
                        <input type="text" value={taskTitle} name="taskTitle" onChange={this.handleChange} />
                        <label>Copy to</label>
                    </>}
                    <div className="move-section flex wrap column">
                        <FormControl variant="filled" className="choose-board clean-mui-arrow full" >
                            <InputLabel id="selectedBoard">Board</InputLabel>
                            <Select
                                labelId="selectedBoard"
                                id="selectedBoard"
                                value={selectedBoard._id}
                                name="selectedBoard"
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
                                onChange={this.handleBoardChange}
                            >
                                {boards.map(board => <MenuItem key={board._id} value={board._id}>{board.title}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <div className="flex">
                            <FormControl variant="filled" className="choose-list clean-mui-arrow full" >
                                <InputLabel id="selectedGroup">List</InputLabel>
                                <Select
                                    name="selectedGroup"
                                    labelId="selectedGroup"
                                    id="selectedGroup"
                                    value={selectedGroup.id}
                                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                                    disableUnderline={true}
                                    onChange={this.handleGroupChange}
                                >
                                    {selectedBoard.groups.map(group => <MenuItem key={group.id} value={group.id}>{group.title}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" className="choose-position clean-mui-arrow " >
                                <InputLabel id="position-select">Position</InputLabel>
                                <Select
                                    name="selectedPosition"
                                    labelId="position-select"
                                    id="position-select"
                                    value={selectedPosition}
                                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                                    disableUnderline={true}
                                    onChange={this.handleChange}
                                >
                                    {(selectedGroup.tasks.length > 0) ?
                                        Array.from(Array(selectedGroup.tasks.length + 1), (e, i) => <MenuItem key={i} value={i}>{i}</MenuItem>) :
                                        <MenuItem value={0}>{0}</MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <button className="primary-btn" onClick={this.onSubmit}>{!isCopy ? 'Move' : 'Create card'}</button>

                </div>
            </Popover >

        )

    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        boards: state.boardModule.boards,
        currTaskDetails: state.appModule.currTaskDetails,
    };
}
const mapDispatchToProps = {
    setCurrTaskDetails,
    saveBoard,
    togglePopover

};

export const PopoverMoveCopy = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PopoverMoveCopy);