import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover } from './Popover'
import { PopoverLabelPreview } from './PopoverLabelPreview'
import { boardService } from '../../services/board.service'

export class PopoverLabels extends Component {
    state = {
        search: '',
        isEdit: false,
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    toggleLabelCheck = (labelId) => {
        const { board, group, task, updateBoard } = this.props
        let updatedLabelsId;

        if (task.labelIds.includes(labelId)) {
            updatedLabelsId = task.labelIds.filter(id => id !== labelId)
        } else {
            updatedLabelsId = [...task.labelIds, labelId]
        }
        task.labelIds = updatedLabelsId
        const newBoard = boardService.updateTask(board, group, task)
        updateBoard(newBoard)
    }



    render() {
        const { togglePopover, currentTarget, title, type, task, board } = this.props
        const { search, labelIds } = this.state
        if (!board) return <div></div>
        console.log(`task`, task.labelIds)
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="popover-labels">
                    <input type="search" placeholder="Search Labels" onChange={this.handleChange} value={search} />
                    <h4>{type}</h4>
                    <ul className="clean-list">
                        {board.labels.filter(label => label.title.toLowerCase().includes(search.toLowerCase()))
                            .map(label =>
                                <PopoverLabelPreview
                                    key={label.id}
                                    label={label}
                                    labelsId={task.labelIds}
                                    toggleLabelCheck={this.toggleLabelCheck}
                                />
                            )}
                    </ul>
                    <button className="secondary-btn">Create a new label</button>
                </div>
            </Popover >
        )
    }
}

