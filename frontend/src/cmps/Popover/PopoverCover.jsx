import React from 'react'
import { ColorPalette } from '../ColorPalette'
import { cloudinaryService } from '../../services/cloudinary-service'
import { Popover } from './Popover'

export class PopoverCover extends React.Component {
    state = {
        isHeaderSelected: null,
        isFullSelected: false,
        selectedColor: false,
        selectedPhoto: null
    }

    componentDidMount() {
        const { currTask } = this.props
        if (!currTask.style) {
            currTask.style = {
                coverMode: '',
                bgColor: null,
                bgUrl: null
            }
        }
        switch (currTask.style.coverMode) {
            case 'header':
                this.setState(prevState => ({
                    ...prevState,
                    isHeaderSelected: true,
                    selectedColor: currTask.style?.bgColor || 'rgba(94, 108, 132, 0.3)',
                    selectedPhoto: currTask.style?.bgUrl || null,

                }))
                break;
            case 'full':
                this.setState(prevState => ({
                    ...prevState,
                    isFullSelected: true,
                    selectedColor: currTask.style?.bgColor || 'rgba(94, 108, 132, 0.3)',
                    selectedPhoto: currTask.style?.bgUrl || null,
                }))
                break;
            default:
                this.setState(prevState => ({
                    ...prevState,
                    selectedColor: 'rgba(94, 108, 132, 0.3)',
                    selectedPhoto: currTask.style?.bgUrl || null,
                }
                ))
                break;
        }
    }

    setHeaderSelected = () => {
        const { updateTaskDetails, currTask } = this.props
        this.setState(prevState => ({
            ...prevState,
            isHeaderSelected: true,
            isFullSelected: false,
        }))
        currTask.style.coverMode = 'header'
        updateTaskDetails(currTask)

    }

    setFullSelected = () => {
        const { updateTaskDetails, currTask } = this.props
        this.setState(prevState => ({
            ...prevState,
            isFullSelected: true,
            isHeaderSelected: false,

        }))
        currTask.style.coverMode = 'full'
        updateTaskDetails(currTask)
    }

    removeCover = () => {
        const { updateTaskDetails, currTask, setBgColorCover, setBgUrlCover } = this.props
        this.setState(prevState => ({
            ...prevState,
            isFullSelected: false,
            isHeaderSelected: false,
        }))
        currTask.style.coverMode = null
        currTask.style.bgColor = null
        currTask.style.bgUrl = null
        setBgColorCover(null)
        setBgUrlCover(null)
        updateTaskDetails(currTask)
    }

    uploadFile = async (ev) => {
        ev.preventDefault()
        const { currTask, updateTaskDetails, setBgUrlCover } = this.props
        const res = await cloudinaryService.uploadFile(ev)
        currTask.style.bgUrl = res.secure_url
        setBgUrlCover(res.secure_url)
        updateTaskDetails(currTask)
    }

    removeFile = async (attachId) => {
        const { currTask, updateTaskDetails } = this.props
        const { attachments } = currTask
        const attachs = attachments.filter(currAttach => currAttach.id !== attachId)
        currTask.attachments = attachs
        await updateTaskDetails(currTask)
    }

    handleChange = (event) => {
        const { updateTaskDetails, currTask, setBgColorCover } = this.props
        const { isFullSelected, isHeaderSelected } = this.state
        const { value } = event.target
        if (!isFullSelected && !isHeaderSelected) {
            this.setState(prevState => ({
                ...prevState,
                isHeaderSelected: true,
                selectedColor: value
            }))
            currTask.style.coverMode = 'header'
        }
        else {
            this.setState(prevState => ({
                ...prevState,
                selectedColor: value
            }))
        }
        currTask.style.bgColor = value
        setBgColorCover(value)
        updateTaskDetails(currTask)
    }

    render() {
        const { isHeaderSelected, isFullSelected, selectedColor, selectedPhoto } = this.state
        if (!selectedColor) return <div></div>
        const { togglePopover, currentTarget, title } = this.props
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="cover-popover" >
                    <h4>SIZE</h4>
                    <div className="cover-options flex space-between align-center">
                        <div className={`header-cover-preview ${isHeaderSelected ? 'selected' : ''}`} onClick={() => { this.setHeaderSelected() }}>
                            {(selectedPhoto) ?
                                <>
                                    <div className="header-section" style={{ backgroundImage: `url(${selectedPhoto}`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
                                    <div style={{ padding: '6px 4px 4px 6px', position: 'relative' }}>
                                        <div className="line" style={{ width: '122px' }}></div>
                                        <div className="line" style={{ width: '98px', marginTop: '4px' }}></div>
                                        <div className="dot"></div>

                                    </div>
                                </>
                                :
                                <>
                                    <div className="header-section" style={{ backgroundColor: selectedColor }}>
                                    </div>
                                    <div style={{ padding: '6px 4px 4px 6px', position: 'relative' }}>
                                        <div className="line" style={{ width: '122px' }}></div>
                                        <div className="line" style={{ width: '98px', marginTop: '4px' }}></div>
                                        <div className="dot"></div>
                                    </div>
                                </>
                            }

                        </div>

                        {(selectedPhoto) ?

                            <div onClick={() => this.setFullSelected()} className={`full-cover-preview ${isFullSelected ? 'selected' : ''}`} style={{ display: 'flex', backgroundImage: `url(${selectedPhoto}`, backgroundSize: 'contain' }}>
                                <div style={{ padding: '6px 4px 4px 6px', position: 'relative', alignSelf: 'flex-end' }}>
                                    <div className="line" style={{ width: '122px' }}></div>
                                    <div className="line" style={{ width: '98px', marginTop: '4px' }}></div>
                                </div>
                            </div>

                            :
                            <>
                                <div onClick={() => this.setFullSelected()} className={`full-cover-preview ${isFullSelected ? 'selected' : ''}`} style={{ backgroundColor: selectedColor, display: 'flex' }}>
                                    <div style={{ padding: '6px 4px 4px 6px', position: 'relative', alignSelf: 'flex-end' }}>
                                        <div className="line" style={{ width: '122px' }}></div>
                                        <div className="line" style={{ width: '98px', marginTop: '4px' }}></div>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                    <div className="flex">
                        <button className="secondary-btn full" onClick={this.removeCover}>Remove Cover</button>
                    </div>
                    <h4>COLOR</h4>
                    <ColorPalette handleChange={this.handleChange} selectedColor={selectedColor} />
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

