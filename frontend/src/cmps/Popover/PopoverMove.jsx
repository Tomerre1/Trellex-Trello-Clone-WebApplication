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


    render() {
        const { togglePopover, currentTarget, title, boards, currGroup } = this.props
        const { selectedBoard, selectedGroup, selectedPosition } = this.state
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
                                defaultValue={selectedBoard._id}
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
                                    defaultValue={selectedGroup.id}
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
                                    defaultValue={selectedPosition}
                                    value={selectedPosition}
                                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                                    disableUnderline={true}
                                    onChange={this.handlePositionChange}
                                >
                                    {selectedGroup.tasks.map((task, index) => <MenuItem value={index}>{index + 1}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>

                    </div>
                    <button className="primary-btn">Move</button>

                </div>
            </Popover >

        )

    }
}