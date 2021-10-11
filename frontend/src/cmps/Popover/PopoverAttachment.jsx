import React, { Component } from 'react'
import { connect } from "react-redux";
import { Popover } from './Popover'
import { utilService } from '../../services/util.service'
import { cloudinaryService } from '../../services/cloudinary-service'
import { saveBoard, saveTaskDetails, addActivity } from '../../store/board.actions'
import { togglePopover, setCurrTaskDetails } from '../../store/app.actions'


export class _PopoverAttachment extends Component {
    state = {
        webUrlSrc: '',
        webUrlName: ''
    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        this.setState(prevState => ({ ...prevState, currGroup }))
    }

    uploadFile = async (ev) => {
        const { board, currTaskDetails, saveTaskDetails, togglePopover, setCurrTaskDetails } = this.props
        const { currGroup } = this.state
        const { attachments } = currTaskDetails
        try {
            const res = await cloudinaryService.uploadFile(ev)
            const attach = { name: res.original_filename, id: res.asset_id, createdAt: Date.now(), url: res.secure_url }
            currTaskDetails.attachments = (attachments) ? [...attachments, attach] : [attach]
            togglePopover()
            setCurrTaskDetails(currTaskDetails)
            await saveTaskDetails(board, currGroup, currTaskDetails)
        }
        catch (err) {
            console.log('error while connect server', err)
        }
    }

    clearState = () => {
        this.setState(prevState => ({ ...prevState, webUrlSrc: '', webUrlName: '' }))
    }

    handleChange = (ev) => {
        const { value, name } = ev.target
        this.setState(prevState => ({ ...prevState, [name]: value }))
    }

    onAttachmentClick = async () => {
        const { webUrlSrc, webUrlName, currGroup } = this.state
        const { board, currTaskDetails, saveTaskDetails, togglePopover, setCurrTaskDetails } = this.props
        const { attachments } = currTaskDetails
        if (webUrlSrc) {
            const attach = {
                id: utilService.makeId(),
                name: (webUrlName) ? webUrlName : webUrlSrc,
                url: (webUrlSrc.startsWith('http' || 'https')) ? webUrlSrc : 'https://' + webUrlSrc,
                createdAt: Date.now(),
                isWeb: true,
            }
            currTaskDetails.attachments = (attachments) ? [...attachments, attach] : [attach]
            togglePopover()
            setCurrTaskDetails(currTaskDetails)
            await saveTaskDetails(board, currGroup, currTaskDetails)
            this.clearState()
        }
    }

    render() {
        const { title } = this.props
        const { webUrlSrc, webUrlName } = this.state
        return (
            <Popover title={title} >
                <div className="attachment-container">
                    <div className="upload-preview" >
                        <label htmlFor="file-upload">Computer</label>
                        <input type="file" onChange={this.uploadFile} accept="img/*" id="file-upload" />
                    </div>
                    <label htmlFor="url-upload">Attach a link</label>
                    <input type="text" id="url-upload" placeholder="Enter link url" value={webUrlSrc} name='webUrlSrc' onChange={this.handleChange} />
                    {webUrlSrc &&
                        <>
                            <label htmlFor="url-name-optional">Link name (optional)</label>
                            <input
                                type="text"
                                id="url-name-optional"
                                name="webUrlName"
                                value={webUrlName}
                                placeholder="Enter link name"
                                onChange={this.handleChange}
                            />
                        </>
                    }
                    <button class="primary-btn" onClick={this.onAttachmentClick}>Attach</button>
                </div>
            </Popover >
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
    togglePopover,
    addActivity,
    setCurrTaskDetails
};

export const PopoverAttachment = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PopoverAttachment);


