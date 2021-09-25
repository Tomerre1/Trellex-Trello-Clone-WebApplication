import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover } from './Popover'
import { boardService } from '../../services/board.service'
import { LoaderSpinner } from '../LoaderSpinner'
import { PopoverLabelsListPreview } from './PopoverLabelsListPreview'
import { saveBoard, saveTaskDetails } from '../../store/board.actions'
import { setCurrTaskDetails } from '../../store/app.actions'
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
        const { board } = this.props
        const { currTask, currGroup } = this.props.currTaskDetails
        const updatedLabelsId = (currTask.labelIds.includes(labelId)) ?
            currTask.labelIds.filter(currLabelId => currLabelId !== labelId) :
            [...currTask.labelIds, labelId]
        currTask.labelIds = updatedLabelsId
        this.props.setCurrTaskDetails({ currTask, currGroup })
        this.props.saveTaskDetails(board, currGroup, currTask)
    }

    toggleIsEdit = () => {
        this.setState(prevState => ({ ...prevState, isEdit: !this.state.isEdit }))
    }


    render() {
        const { togglePopover, currentTarget, title, board, currTaskDetails } = this.props
        const { search, isEdit, isCreate } = this.state
        console.log('%c  currTaskDetails:', 'color: #0e93e0;background: #aaefe5;', currTaskDetails);
        if (!board) return <LoaderSpinner />
        return (

            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                {!isEdit && !isCreate &&
                    <PopoverLabelsListPreview
                        labels={board.labels}
                        labelIds={currTaskDetails.currTask.labelIds}
                        search={search}
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
        currTaskDetails: state.appModule.currTaskDetails
    };
}

const mapDispatchToProps = {
    saveBoard,
    saveTaskDetails,
    setCurrTaskDetails
};
export const PopoverLabels = connect(mapStateToProps, mapDispatchToProps)(_PopoverLabels);
