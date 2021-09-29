import React, { Component } from 'react'
import { Popover } from './Popover'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import { addSeconds } from 'date-fns/esm';
export class PopoverMove extends Component {
    state = {
        selectedGroup: null,
        selectedBoard: null,
        selectedPosition: null,
    }

    componentDidMount() {
        const { boards, board, currTask, currGroup } = this.props
        const selectedPosition = currGroup.tasks.indexOf(currTask)
        this.setState(prevState => ({ ...prevState, selectedBoard: board, selectedGroup: currGroup, selectedPosition }))
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

    handlePositionChange = (e) => {
        const { value } = e.target
        this.setState(prevState => ({ ...prevState, selectedPosition: value }))
    }

    submitMoveSameBoard = () => {
        const { selectedBoard, selectedGroup, selectedPosition } = this.state
        const { currTask, updateBoard, currGroup } = this.props
        debugger;
        //before group selection
        const fromGroupIdx = selectedBoard.groups.indexOf(currGroup)
        //find task in current group
        const fromTaskIdx = selectedBoard.groups[fromGroupIdx].tasks.indexOf(currTask)
        //remove task from current group
        const task = selectedBoard.groups[fromGroupIdx].tasks.splice(fromTaskIdx, 1)

        //find group in selected board
        const toGroupIdx = selectedBoard.groups.indexOf(selectedGroup)
        //add task to selected group
        selectedBoard.groups[toGroupIdx].tasks.splice(selectedPosition, 0, task[0])

        //update board
        updateBoard(selectedBoard)
    }


    submitMove = async () => {
        const { selectedBoard, selectedGroup, selectedPosition } = this.state
        const { currTask, updateBoard, board, currGroup, boards } = this.props
        if (!selectedBoard || !selectedGroup) return
        if (board._id !== selectedBoard._id) {
            //find board in boards
            const currBoard = boards.find(currBoard => currBoard._id === board._id)
            //find index of curr board in boards
            const fromBoardIdx = boards.indexOf(currBoard)
            //find group in board
            const fromGroup = boards[fromBoardIdx].groups.find(group => group.id === currGroup.id)
            const fromGroupIdx = boards[fromBoardIdx].groups.indexOf(fromGroup)
            //find task in group
            const fromTask = boards[fromBoardIdx].groups[fromGroupIdx].tasks.find(task => task.id === currTask.id)
            const fromTaskIdx = boards[fromBoardIdx].groups[fromGroupIdx].tasks.indexOf(fromTask)
            //remove task from group
            const task = boards[fromBoardIdx].groups[fromGroupIdx].tasks.splice(fromTaskIdx, 1)
            await updateBoard({ ...boards[fromBoardIdx] })
            //find board in selected board
            const toBoardIdx = boards.indexOf(selectedBoard)
            //find group in selected board
            const toGroupIdx = boards[toBoardIdx].groups.indexOf(selectedGroup)
            //add task to selected group
            boards[toBoardIdx].groups[toGroupIdx].tasks.splice(selectedPosition, 0, task[0])
            await updateBoard(boards[toBoardIdx])
        }

        else {
            this.submitMoveSameBoard()
        }
    }


    render() {
        const { togglePopover, currentTarget, title, boards, currGroup } = this.props
        const { selectedBoard, selectedGroup, selectedPosition } = this.state
        console.log('%c  selectedGroup:', 'color: #00000;background: #aaefe5;', selectedGroup);
        if (!(selectedBoard && selectedGroup && selectedPosition !== -1)) return <></>
        return (

            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="popover-move-content">
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
                                    onChange={this.handlePositionChange}
                                >
                                    {(selectedGroup.tasks.length > 0) ?
                                        selectedGroup.tasks.map((task, index) => <MenuItem value={index}>{index}</MenuItem>) :
                                        <MenuItem value={0}>{0}</MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </div>

                    </div>
                    <button className="primary-btn" onClick={this.submitMove}>Move</button>

                </div>
            </Popover >

        )

    }
}