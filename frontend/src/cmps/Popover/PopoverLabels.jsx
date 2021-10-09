import { connect } from "react-redux";
import React, { Component } from 'react'
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
        labels: null,
        labelIds: null
    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        this.setState(prevState => ({
            ...prevState,
            labels: this.props.board.labels,
            labelIds: this.props.currTaskDetails.labelIds,
            currGroup
        }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isEditCreate) {
            this.setState(prevState => ({ ...prevState, isEditCreate: false, label: { color: '', title: '' } }))
        }
    }


    handleChange = (e) => {
        this.setState(prevState => ({
            ...prevState,
            search: e.target.value
        }))
    }

    toggleLabelCheck = async (labelId) => {
        const { currTaskDetails, board, saveTaskDetails, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        const updatedLabelsId = (currTaskDetails.labelIds.includes(labelId)) ?
            currTaskDetails.labelIds.filter(currLabelId => currLabelId !== labelId) :
            [...currTaskDetails.labelIds, labelId]
        currTaskDetails.labelIds = updatedLabelsId
        this.setState(prevState => ({ ...prevState, labelIds: updatedLabelsId }))
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
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
        this.setState(prevState => ({ ...prevState, labels: labels }))
        this.toggleIsEditCreate()
        board.labels = labels
        await saveBoard(board)
    }

    removeLabel = async (label) => {
        const { board, saveBoard, currTaskDetails, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        const labels = board.labels.filter(currLabel => currLabel.id !== label.id)
        currTaskDetails.labelIds = currTaskDetails.labelIds.filter(currLabelId => currLabelId !== label.id)
        this.setState(prevState => ({ ...prevState, labels: labels }))
        this.toggleIsEditCreate()
        board.labels = labels
        setCurrTaskDetails(currTaskDetails)
        await saveTaskDetails(board, currGroup, currTaskDetails)
        await saveBoard(board)
    }


    toggleIsEditCreate = () => {
        this.setState(prevState => ({ ...prevState, isEditCreate: !this.state.isEditCreate }))
    }


    render() {
        const { currTaskDetails, title } = this.props
        const { search, label, labels, isEditCreate, } = this.state
        if (!currTaskDetails || !labels) return <></>
        return (
            <>
                <Popover title={title} >
                    {!isEditCreate &&
                        <PopoverLabelsListPreview
                            labels={labels}
                            labelIds={currTaskDetails.labelIds}
                            search={search}
                            handleChange={this.handleChange}
                            toggleLabelCheck={this.toggleLabelCheck}
                            toggleIsEditCreate={this.toggleIsEditCreate}
                            setLabelEdit={this.setLabelEdit}
                        />
                    }
                    {isEditCreate && <PopoverLabelCreateEdit label={label} removeLabel={this.removeLabel} submitLabel={this.submitLabel} />}
                </Popover >
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
    };
}
const mapDispatchToProps = {
    saveTaskDetails,
    saveBoard,
    setCurrTaskDetails
};

export const PopoverLabels = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PopoverLabels);
