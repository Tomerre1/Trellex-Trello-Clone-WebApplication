import React, { Component } from 'react'
import { Popover } from './Popover'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
export class PopoverMove extends Component {
    render() {
        const { togglePopover, currentTarget, title, boards } = this.props

        return (

            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="popover-move-content">
                    <div className="move-section flex wrap column">
                        <FormControl variant="filled" className="choose-board clean-mui-arrow full" >
                            <InputLabel id="board-select flex wrap ">Board</InputLabel>
                            <Select
                                labelId="board-select"
                                id="board-select"
                                value={'x'}
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
                                disableUnderline={true}

                            >
                                {boards.map(board => <MenuItem value={board._id}>{board.title}</MenuItem>)}

                            </Select>
                        </FormControl>
                        <div className="flex">
                            <FormControl variant="filled" className="choose-list clean-mui-arrow full" >
                                <InputLabel id="list-select flex wrap ">List</InputLabel>
                                <Select
                                    labelId="list-select"
                                    id="list-select"
                                    value={'x'}
                                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                                    disableUnderline={true}

                                >
                                    {/* Map all boards from workspace */}
                                    <MenuItem value={'1'}>{'1'}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" className="choose-position clean-mui-arrow " >
                                <InputLabel id="position-select flex wrap ">Position</InputLabel>
                                <Select
                                    labelId="position-select"
                                    id="position-select"
                                    value={'x'}
                                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                                    disableUnderline={true}

                                >
                                    {/* Map all boards from workspace */}
                                    <MenuItem value={'1'}>{'1'}</MenuItem>
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
