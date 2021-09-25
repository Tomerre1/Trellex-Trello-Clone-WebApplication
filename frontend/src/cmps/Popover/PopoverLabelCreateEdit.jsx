import { Component } from "react";
import { ColorPalette } from "../ColorPalette";
import { Popover } from './Popover'
export class PopoverLabelCreateEdit extends Component {

    state = {
        title: '',
        color: ''
    }

    componentDidMount() {
        const { label } = this.props
        this.setState({
            title: label?.title || '',
            color: label?.color || '',
            id: label?.id || ''
        })
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })
    }

    onSubmitEditLabel = () => {
        if (!this.state.title || !this.state.color) return
        this.props.submitLabel({ ...this.state })
    }

    onSubmitCreate = () => {
        if (!this.state.title || !this.state.color) return
        this.props.submitCreateLabel({ ...this.state })
    }

    onRemoveLabel = () => {
        this.props.removeLabel({ ...this.state })
    }

    render() {
        const { title, color } = this.state
        const { label } = this.props
        return <>
            <div className="label-add-content">
                <label htmlFor="label-input">Name</label>
                <input
                    id="label-input"
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    className="pop-over-input"
                />
                <h4>Color</h4>
                <ColorPalette handleChange={this.handleChange} selectedColor={color} />
            </div>
            <div className="flex space-between">
                <button className="primary-btn" onClick={this.onSubmitEditLabel} >
                    {label && label.title ? 'Save' : 'Create'}
                </button>
                {label.title && <button className="danger-btn" onClick={this.onRemoveLabel}>
                    Delete
                </button>}
            </div>
        </>
    }
}