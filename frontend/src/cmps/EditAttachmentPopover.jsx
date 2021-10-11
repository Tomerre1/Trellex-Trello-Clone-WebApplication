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

    onAttachmentUpdate = () => {
        const { url, urlName } = this.state
        this.props.updateAttachment(url, urlName)
    }

    render() {
        const { attachment } = this.props
        const { url, urlName } = this.state

        let attachName = attachment.name
        if (attachName.length > 15) attachName = attachName.substr(0, 15) + '...'

        const title = `Update ${attachName}`
        return (
            <div className="edit-attach-container">
                <Popover title={title} >
                    <div className="attachment-container">
                        {attachment.isWeb &&
                            <>
                                <label htmlFor="url-upload">Link</label>
                                <input type="text" id="url-upload" placeholder="Enter link url" value={url} name='url' onChange={this.handleChange} />
                            </>
                        }
                        <label htmlFor="url-name-optional">Link name (optional)</label>
                        <input
                            type="text"
                            id="url-name-optional"
                            name="urlName"
                            value={urlName}
                            placeholder="Enter link name"
                            onChange={this.handleChange}
                        />
                        <button className="primary-btn" onClick={this.onAttachmentUpdate}>Update</button>
                    </div>
                </Popover >
            </div >
        )
    }
}