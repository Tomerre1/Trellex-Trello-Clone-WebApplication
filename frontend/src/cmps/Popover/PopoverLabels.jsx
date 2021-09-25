import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover } from './Popover'
import { boardService } from '../../services/board.service'
import { LoaderSpinner } from '../LoaderSpinner'
import { PopoverLabelsListPreview } from './PopoverLabelsListPreview'
import { saveBoard } from '../../store/board.actions'
export class _PopoverLabels extends Component {
    state = {
        search: '',
        isEdit: false,
        isCreate: false
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

    toggleIsEdit = () => {
        this.setState(prevState => ({ ...prevState, isEdit: !this.state.isEdit }))
    }


    render() {
        const { togglePopover, currentTarget, title, task, board } = this.props
        const { search, isEdit, isCreate } = this.state
        if (!board) return <LoaderSpinner />
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                {!isEdit && !isCreate &&
                    <PopoverLabelsListPreview
                        labelIds={task.labelIds}
                        search={search}
                        labels={board.labels}
                        handleChange={this.handleChange}
                        toggleLabelCheck={this.toggleLabelCheck}
                        toggleIsEdit={this.toggleIsEdit}
                    />
                }
                {isEdit && <div>hi</div>}

            </Popover >
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    };
}
const mapDispatchToProps = {
    saveBoard
};

export const PopoverLabels = connect(mapStateToProps, mapDispatchToProps)(_PopoverLabels);
