import React, { Component } from 'react'
import { Popover } from './Popover/Popover'


export class EditAttachmentPopover extends Component {
    state = {
        url: '',
        urlName: '',
    }


    componentDidMount = () => {
        const { attachment } = this.props
        this.setState(prevState => ({ ...prevState, url: attachment.url, urlName: attachment.name }))
    }

    handleChange = (ev) => {
        const { value, name } = ev.target
        this.setState(prevState => ({ ...prevState, [name]: value }))
    }

    render() {
        const { attachment, updateAttachment, currentTarget, togglePopover } = this.props
        const { url, urlName } = this.state
        const title = `Update ${attachment.name}`
        return (
            <div className="edit-attach-container">
                <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                    <div className="attachment-container">
                        <label htmlFor="url-upload">Link</label>
                        <input type="text" id="url-upload" placeholder="Enter link url" value={url} name='url' onChange={this.handleChange} />
                        <label htmlFor="url-name-optional">Link name (optional)</label>
                        <input
                            type="text"
                            id="url-name-optional"
                            name="urlName"
                            value={urlName}
                            placeholder="Enter link name"
                            onChange={this.handleChange}
                        />
                        <button class="primary-btn" onClick={this.onAttachmentUpdate}>Update</button>

                    </div>
                </Popover >
            </div >
        )
    }
}

//WEB
// createdAt: 1633095046382
// id: "vg5adv"
// isWeb: true
// name: "bla bla"
// url: "youtube.com"

//NORMAL
// createdAt: 1633095059718
// id: "7e839def8feaf14254d3e9cace3ea87d"
// name: "dada"
// url: "https://res.c