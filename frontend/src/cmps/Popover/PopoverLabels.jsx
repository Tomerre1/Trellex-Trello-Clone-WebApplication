import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'
import { LoaderSpinner } from '../LoaderSpinner'
import { PopoverLabelsListPreview } from './PopoverLabelsListPreview'
import { PopoverLabelCreateEdit } from './PopoverLabelCreateEdit'
import { saveBoard, saveTaskDetails } from '../../store/board.actions'
import { setCurrTaskDetails } from '../../store/app.actions'
export class _PopoverLabels extends Component {
    state = {
        search: '',
        isEditCreate: false,
        label: {
            title: '',
            color: '',
        },

    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    toggleLabelCheck = async (labelId) => {
        const { board } = this.props
        const { currTask, currGroup } = this.props.currTaskDetails
        const updatedLabelsId = (currTask.labelIds.includes(labelId)) ?
            currTask.labelIds.filter(currLabelId => currLabelId !== labelId) :
            [...currTask.labelIds, labelId]
        currTask.labelIds = updatedLabelsId
        await this.props.saveTaskDetails(board, currGroup, currTask)
        // this.props.setCurrTaskDetails({ currTask, currGroup })
    }

    setLabelEdit = (label) => {
        this.setState(prevState => ({ ...prevState, label }))
    }

    submitLabel = async (label) => {
        const { board, saveBoard } = this.props
        let labels;
        if (label.id) {
            labels = board.labels.map(currLabel => (currLabel.id === label.id) ? label : currLabel)
        } else {
            label.id = utilService.makeId()
            labels = [...board.labels, label]
        }
        await saveBoard({ ...board, labels })
        this.toggleIsEditCreate()
    }

    removeLabel = async (label) => {
        const { board, saveBoard } = this.props
        const labels = board.labels.filter(currLabel => currLabel.id !== label.id)
        await saveBoard({ ...board, labels })
        this.toggleIsEditCreate()
    }


    toggleIsEditCreate = () => {
        this.setState(prevState => ({ ...prevState, isEditCreate: !this.state.isEditCreate }))
    }

    getTitle = () => {
        const { isEdit, isCreate } = this.state;
        const { title } = this.props
        if (isEdit) return 'Edit a label'
        else if (isCreate) return 'Create a label'
        else return title
    }

    render() {

        const { togglePopover, currentTarget, board, currTaskDetails } = this.props
        const { search, label, isEditCreate } = this.state
        if (!board) return <LoaderSpinner />
        return (

            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={this.getTitle()} >
                {!isEditCreate &&
                    <PopoverLabelsListPreview
                        labels={board.labels}
                        labelIds={currTaskDetails.currTask.labelIds}
                        search={search}
                        handleChange={this.handleChange}
                        toggleLabelCheck={this.toggleLabelCheck}
                        toggleIsEditCreate={this.toggleIsEditCreate}
                        setLabelEdit={this.setLabelEdit}

                    />
                }
                {isEditCreate && <PopoverLabelCreateEdit label={label} removeLabel={this.removeLabel} submitLabel={this.submitLabel} />}

            </Popover >
        )
    }
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board
    };
}

const mapDispatchToProps = {
    saveBoard,
    saveTaskDetails,
    setCurrTaskDetails
};
export const PopoverLabels = connect(mapStateToProps, mapDispatchToProps)(_PopoverLabels);
