import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover } from './Popover'
import { boardService } from '../../services/board.service'
import { LoaderSpinner } from '../LoaderSpinner'
import { PopoverLabelsListPreview } from './PopoverLabelsListPreview'
import { saveBoard, saveTaskDetails, setCurrTaskDetails } from '../../store/board.actions'
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
        const { saveTaskDetails, board } = this.props
        const { currTask, currGroup } = this.props.board.currTaskDetails
        const updatedLabelsId = (currTask.labelIds.includes(labelId)) ?
            currTask.labelIds.filter(currLabelId => currLabelId !== labelId) :
            [...currTask.labelIds, labelId]
        currTask.labelIds = updatedLabelsId
        saveTaskDetails(board, currGroup, currTask)
    }

    toggleIsEdit = () => {
        this.setState(prevState => ({ ...prevState, isEdit: !this.state.isEdit }))
    }


    render() {
        const { togglePopover, currentTarget, title, board } = this.props
        const { currTask } = board.currTaskDetails
        const { search, isEdit, isCreate } = this.state
        console.log('%c  currTask.labelIds:', 'color: #0e93e0;background: #aaefe5;', currTask.labelIds);
        if (!board) return <LoaderSpinner />
        return (

            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                {!isEdit && !isCreate &&
                    <PopoverLabelsListPreview
                        labelIds={currTask.labelIds}
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
        currTaskDetails: state.appModule.currTaskDetails
    };
}
const mapDispatchToProps = {
    saveBoard,
    saveTaskDetails,
    setCurrTaskDetails
};

export const PopoverLabels = connect(mapStateToProps, mapDispatchToProps)(_PopoverLabels);
