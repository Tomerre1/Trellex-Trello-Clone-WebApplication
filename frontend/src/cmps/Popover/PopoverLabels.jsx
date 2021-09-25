import React, { Component } from 'react'
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'
import { LoaderSpinner } from '../LoaderSpinner'
import { PopoverLabelsListPreview } from './PopoverLabelsListPreview'
import { PopoverLabelCreateEdit } from './PopoverLabelCreateEdit'
export class PopoverLabels extends Component {
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
        this.setState(prevState => ({
            ...prevState,
            labels: this.props.board.labels,
            labelIds: this.props.currTask.labelIds,
        }))
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    toggleLabelCheck = async (labelId) => {
        const { updateTaskDetails } = this.props
        const { currTask } = this.props
        const updatedLabelsId = (currTask.labelIds.includes(labelId)) ?
            currTask.labelIds.filter(currLabelId => currLabelId !== labelId) :
            [...currTask.labelIds, labelId]
        currTask.labelIds = updatedLabelsId
        this.setState(prevState => ({ ...prevState, labelIds: updatedLabelsId }))
        updateTaskDetails(currTask)

    }

    setLabelEdit = (label) => {
        this.setState(prevState => ({ ...prevState, label }))
    }

    submitLabel = async (label) => {
        const { board, updateBoard } = this.props
        let labels;
        if (label.id) {
            labels = board.labels.map(currLabel => (currLabel.id === label.id) ? label : currLabel)
        } else {
            label.id = utilService.makeId()
            labels = [...board.labels, label]
        }
        this.setState(prevState => ({ ...prevState, labels: labels }))
        this.toggleIsEditCreate()
        updateBoard({ ...board, labels })
    }

    removeLabel = async (label) => {
        const { board, updateBoard } = this.props
        const labels = board.labels.filter(currLabel => currLabel.id !== label.id)
        this.setState(prevState => ({ ...prevState, labels: labels }))
        this.toggleIsEditCreate()
        updateBoard({ ...board, labels })
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

        const { togglePopover, currentTarget, currTask } = this.props
        const { search, label, labels, isEditCreate, } = this.state
        if (!currTask) return <LoaderSpinner />
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={this.getTitle()} >
                {!isEditCreate &&
                    <PopoverLabelsListPreview
                        labels={labels}
                        labelIds={currTask.labelIds}
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

