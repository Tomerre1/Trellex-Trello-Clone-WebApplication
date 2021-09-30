import React, { Component } from 'react'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
export class PopoverMoveCopy extends Component {
    state = {
        selectedGroup: null,
        selectedBoard: null,
        selectedPosition: null,
        taskTitle: ''

    }

    componentDidMount() {
        const { board, currTask, currGroup } = this.props
        const selectedPosition = currGroup.tasks.indexOf(currTask)
        this.setState(prevState => ({
            ...prevState,
            selectedBoard: board,
            selectedGroup: currGroup,
            selectedPosition,
            taskTitle: currTask.title
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
        const { selectedBoard, selectedGroup, selectedPosition, taskTitle } = this.state
        const { currTask, updateBoard, currGroup, isCopy } = this.props
        const fromGroupIdx = selectedBoard.groups.indexOf(currGroup)
        const fromTaskIdx = selectedBoard.groups[fromGroupIdx].tasks.indexOf(currTask)
        const task = (isCopy) ? { ...currTask, id: utilService.makeId(), title: taskTitle } :
            selectedBoard.groups[fromGroupIdx].tasks.splice(fromTaskIdx, 1)
        const toGroupIdx = selectedBoard.groups.indexOf(selectedGroup)
        selectedBoard.groups[toGroupIdx].tasks.splice(selectedPosition, 0, isCopy ? task : task[0])
        await updateBoard(selectedBoard)
    }

    submitMoveAnotherBoard = async () => {
        const { selectedBoard, selectedGroup, selectedPosition, taskTitle } = this.state
        const { currTask, updateBoard, board, currGroup, boards, isCopy } = this.props
        const currBoard = boards.find(currBoard => currBoard._id === board._id)
        const fromBoardIdx = boards.indexOf(currBoard)
        const fromGroup = boards[fromBoardIdx].groups.find(group => group.id === currGroup.id)
        const fromGroupIdx = boards[fromBoardIdx].groups.indexOf(fromGroup)
        const fromTask = boards[fromBoardIdx].groups[fromGroupIdx].tasks.find(task => task.id === currTask.id)
        const fromTaskIdx = boards[fromBoardIdx].groups[fromGroupIdx].tasks.indexOf(fromTask)
        const task = (isCopy) ? { ...currTask, id: utilService.makeId(), title: taskTitle } : boards[fromBoardIdx].groups[fromGroupIdx].tasks.splice(fromTaskIdx, 1)
        await updateBoard(boards[fromBoardIdx])

        const toBoardIdx = boards.indexOf(selectedBoard)
        const toGroupIdx = boards[toBoardIdx].groups.indexOf(selectedGroup)
        boards[toBoardIdx].groups[toGroupIdx].tasks.splice(selectedPosition, 0, isCopy ? task : task[0])
        await updateBoard(boards[toBoardIdx])
    }

    onSubmit = () => {
        const { selectedBoard, selectedGroup, taskTitle } = this.state
        const { board } = this.props
        if (!selectedBoard || !selectedGroup || !taskTitle) return
        if (board._id !== selectedBoard._id) this.submitMoveAnotherBoard()
        else this.submitMoveSameBoard()

    }


    render() {
        const { togglePopover, currentTarget, title, boards, currTask, isCopy } = this.props
        const { selectedBoard, selectedGroup, selectedPosition, taskTitle } = this.state
        if (!(selectedBoard)) return <></>
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
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
                                {boards.map(board => <MenuItem value={board._id}>{board.title}</MenuItem>)}
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
                                    {selectedBoard.groups.map(group => <MenuItem value={group.id}>{group.title}</MenuItem>)}
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
                                        Array.from(Array(selectedGroup.tasks.length + 1), (e, i) => <MenuItem value={i}>{i}</MenuItem>) :
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