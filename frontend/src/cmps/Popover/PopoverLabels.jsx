import React, { Component } from 'react'
import { Popover } from './Popover'
import { PopoverLabelPreview } from './PopoverLabelPreview'

export class PopoverLabels extends Component {
    state = {
        search: '', 
        isEdit: false
    }
    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }



    render() {
        const { togglePopover, currentTarget, labels, labelsId, title, type } = this.props
        const { search } = this.state
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="popover-labels">
                    <input type="search" placeholder="Search Labels" onChange={this.handleChange} value={search} />
                    <h4>{type}</h4>
                    <ul className="clean-list">
                        {labels.filter(label => label.title.toLowerCase().includes(search.toLowerCase()))
                            .map(label =>
                                <PopoverLabelPreview
                                    key={label.id}
                                    label={label}
                                    labelsId={labelsId}
                                />
                            )}
                    </ul>
                    <button className="secondary-btn">Create a new label</button>
                </div>
                
                
            </Popover >
        )
    }
}

