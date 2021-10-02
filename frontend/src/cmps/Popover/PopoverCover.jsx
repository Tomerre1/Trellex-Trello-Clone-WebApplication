import React from 'react'
import { ColorPalette } from '../ColorPalette'
import { cloudinaryService } from '../../services/cloudinary-service'
import { Popover } from './Popover'
import { connect } from 'react-redux'
import { saveTaskDetails } from '../../store/board.actions'

export class _PopoverCover extends React.Component {
    state = {
        isHeaderSelected: null,
        isFullSelected: false,
        selectedColor: false,
        selectedPhoto: null
    }

    componentDidMount() {
        const { board, currTaskDetails } = this.props
        const currGroup = board.groups.find(group => group.tasks.some(task => task.id === currTaskDetails.id))
        if (!currTaskDetails.style) {
            currTaskDetails.style = {
                coverMode: '',
                bgColor: null,
                bgUrl: null
            }
        }
        switch (currTaskDetails.style.coverMode) {
            case 'header':
                this.setState(prevState => ({
                    ...prevState,
                    isHeaderSelected: true,
                    selectedColor: currTaskDetails.style?.bgColor || 'rgba(94, 108, 132, 0.3)',
                    selectedPhoto: currTaskDetails.style?.bgUrl || null,
                    currGroup

                }))
                break;
            case 'full':
                this.setState(prevState => ({
                    ...prevState,
                    isFullSelected: true,
                    selectedColor: currTaskDetails.style?.bgColor || 'rgba(94, 108, 132, 0.3)',
                    selectedPhoto: currTaskDetails.style?.bgUrl || null,
                    currGroup
                }))
                break;
            default:
                this.setState(prevState => ({
                    ...prevState,
                    selectedColor: 'rgba(94, 108, 132, 0.3)',
                    selectedPhoto: currTaskDetails.style?.bgUrl || null,
                    currGroup
                }
                ))
                break;
        }
    }

    setHeaderSelected = async () => {
        const { currTaskDetails, saveTaskDetails, board } = this.props
        const { currGroup } = this.state
        this.setState(prevState => ({
            ...prevState,
            isHeaderSelected: true,
            isFullSelected: false,
        }))
        currTaskDetails.style.coverMode = 'header'
        await saveTaskDetails(board, currGroup, currTaskDetails)

    }

    setFullSelected = async () => {
        const { currTaskDetails, board, saveTaskDetails } = this.props
        const { currGroup } = this.state
        this.setState(prevState => ({
            ...prevState,
            isFullSelected: true,
            isHeaderSelected: false,
        }))
        currTaskDetails.style.coverMode = 'full'
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    removeCover = async () => {
        const { saveTaskDetails, currTaskDetails, board } = this.props
        const { currGroup } = this.state
        this.setState(prevState => ({
            ...prevState,
            isFullSelected: false,
            isHeaderSelected: false,
        }))
        currTaskDetails.style.coverMode = null
        currTaskDetails.style.bgColor = null
        currTaskDetails.style.bgUrl = null
        // setBgColorCover(null)
        // setBgUrlCover(null)
        await saveTaskDetails(board, currGroup, currTaskDetails)

    }

    uploadFile = async (ev) => {
        ev.preventDefault()
        const { currTaskDetails, saveTaskDetails, board } = this.props
        const { currGroup } = this.state
        const res = await cloudinaryService.uploadFile(ev)
        currTaskDetails.style.bgUrl = res.secure_url
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    removeFile = async (attachId) => {
        const { currTaskDetails, saveTaskDetails, board } = this.props
        const { currGroup } = this.state
        const { attachments } = currTaskDetails
        const attachs = attachments.filter(currAttach => currAttach.id !== attachId)
        currTaskDetails.attachments = attachs
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    handleChange = async (event) => {
        const { saveTaskDetails, currTaskDetails, board } = this.props
        const { isFullSelected, isHeaderSelected, currGroup } = this.state
        const { value } = event.target
        if (!isFullSelected && !isHeaderSelected) {
            this.setState(prevState => ({
                ...prevState,
                isHeaderSelected: true,
                selectedColor: value
            }))
            currTaskDetails.style.coverMode = 'header'
        }
        else {
            this.setState(prevState => ({
                ...prevState,
                selectedColor: value
            }))
        }
        currTaskDetails.style.bgColor = value
        // setBgColorCover(value)
        await saveTaskDetails(board, currGroup, currTaskDetails)
    }

    render() {
        const { isHeaderSelected, isFullSelected, selectedColor, selectedPhoto } = this.state
        const { title, currTaskDetails } = this.props
        const { bgColor, bgUrl } = currTaskDetails.style
        return (
            <Popover title={title} >
                <div className="cover-popover" >
                    <h4>SIZE</h4>
                    <div className="cover-options flex space-between align-center">
                        <div className={`header-cover-preview ${isHeaderSelected ? 'selected' : ''}`} onClick={() => { this.setHeaderSelected() }}>
                            {(bgUrl) ?
                                <>
                                    <div className="header-section" style={{ backgroundImage: `url(${bgUrl}`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
                                    <div style={{ padding: '6px 4px 4px 6px', position: 'relative' }}>
                                        <div className="line" style={{ width: '122px' }}></div>
                                        <div className="line" style={{ width: '98px', marginTop: '4px' }}></div>
                                        <div className="dot"></div>

                                    </div>
                                </>
                                :
                                <>
                                    <div className="header-section" style={{ backgroundColor: bgColor }}>
                                    </div>
                                    <div style={{ padding: '6px 4px 4px 6px', position: 'relative' }}>
                                        <div className="line" style={{ width: '122px' }}></div>
                                        <div className="line" style={{ width: '98px', marginTop: '4px' }}></div>
                                        <div className="dot"></div>
                                    </div>
                                </>
                            }
                        </div>

                        {(bgUrl) ?
                            <div onClick={() => this.setFullSelected()} className={`full-cover-preview ${isFullSelected ? 'selected' : ''}`} style={{ display: 'flex', backgroundImage: `url(${bgUrl}`, backgroundSize: 'contain' }}>
                                <div style={{ padding: '6px 4px 4px 6px', position: 'relative', alignSelf: 'flex-end' }}>
                                    <div className="line" style={{ width: '122px' }}></div>
                                    <div className="line" style={{ width: '98px', marginTop: '4px' }}></div>
                                </div>
                            </div>
                            :
                            <div onClick={() => this.setFullSelected()} className={`full-cover-preview ${isFullSelected ? 'selected' : ''}`} style={{ backgroundColor: bgColor, display: 'flex' }}>
                                <div style={{ padding: '6px 4px 4px 6px', position: 'relative', alignSelf: 'flex-end' }}>
                                    <div className="line" style={{ width: '122px' }}></div>
                                    <div className="line" style={{ width: '98px', marginTop: '4px' }}></div>
                                </div>
                            </div>
                        }

                    </div>
                    <div className="flex">
                        <button className="secondary-btn full" onClick={this.removeCover}>Remove Cover</button>
                    </div>
                    <h4>COLOR</h4>
                    <ColorPalette handleChange={this.handleChange} selectedColor={bgColor} />
                    <h4>ATTACHMENT</h4>
                    <div className="upload-preview">
                        <label className="secondary-btn" htmlFor="file-upload">Upload a cover image</label>
                        <input type="file" onChange={this.uploadFile} accept="img/*" id="file-upload" />
                    </div>
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
};

export const PopoverCover = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PopoverCover);
