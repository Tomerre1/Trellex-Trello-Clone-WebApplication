import React from 'react'
import { ColorPalette } from '../ColorPalette'
import { Popover } from './Popover'

export class PopoverCover extends React.Component {

    state = {
        isHeaderSelected: null,
        isFullSelected: false,
        selectedColor: false,

    }


    componentDidMount() {
        const { currTask } = this.props
        switch (currTask.style.coverMode) {
            case 'header':
                this.setState(prevState => ({
                    ...prevState,
                    isHeaderSelected: true,
                    selectedColor: currTask.style?.bgColor || 'rgba(94, 108, 132, 0.3)',

                }))
                break;
            case 'full':
                this.setState(prevState => ({
                    ...prevState,
                    isFullSelected: true,
                    selectedColor: currTask.style?.bgColor || 'rgba(94, 108, 132, 0.3)',
                }))
                break;
            default:
                this.setState(prevState => ({
                    ...prevState,
                    selectedColor: 'rgba(94, 108, 132, 0.3)',
                }
                ))
                break;
        }
    }

    setHeaderSelected = () => {
        const { updateTaskDetails, currTask, setIsCover } = this.props

        this.setState(prevState => ({
            ...prevState,
            isHeaderSelected: true,
            isFullSelected: false,
        }))
        currTask.style.coverMode = 'header'
        setIsCover(true)
        updateTaskDetails(currTask)

    }

    setFullSelected = () => {
        const { updateTaskDetails, currTask, setIsCover } = this.props
        this.setState(prevState => ({
            ...prevState,
            isFullSelected: true,
            isHeaderSelected: false,

        }))
        currTask.style.coverMode = 'full'
        setIsCover(true)
        updateTaskDetails(currTask)
    }

    removeCover = () => {
        const { updateTaskDetails, currTask, setBgColorCover, setIsCover } = this.props
        this.setState(prevState => ({
            ...prevState,
            isFullSelected: false,
            isHeaderSelected: false,
        }))
        currTask.style.coverMode = null
        currTask.style.bgColor = null
        setBgColorCover(null)
        setIsCover(false)
        updateTaskDetails(currTask)
    }

    handleChange = (event) => {
        const { updateTaskDetails, currTask, setBgColorCover, setIsCover } = this.props
        const { isFullSelected, isHeaderSelected } = this.state
        const { value } = event.target
        if (!isFullSelected && !isHeaderSelected) {
            this.setState(prevState => ({
                ...prevState,
                isHeaderSelected: true,
                selectedColor: value
            }))
            currTask.style.coverMode = 'header'
            setIsCover(true)
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


    // bgColor: "#60bd4f"
    // bgImgUrl: ""
    // coverMode: "header"



    render() {
        const { isHeaderSelected, isFullSelected, selectedColor } = this.state
        if (!selectedColor) return <div></div>
        const { togglePopover, currentTarget, title } = this.props
        return (
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title} >
                <div className="cover-popover" >
                    <h4>SIZE</h4>
                    <div className="cover-options flex space-between align-center">
                        <div className={`header-cover-preview ${isHeaderSelected ? 'selected' : ''}`} onClick={() => { this.setHeaderSelected() }}>
                            <div className="header-section" style={{ backgroundColor: selectedColor }}></div>
                        </div>
                        <div onClick={() => this.setFullSelected()} className={`full-cover-preview ${isFullSelected ? 'selected' : ''}`} style={{ backgroundColor: selectedColor }}></div>
                    </div>
                    <div className="flex">
                        <button className="secondary-btn full" onClick={this.removeCover}>Remove Cover</button>
                    </div>
                    <h4>COLOR</h4>
                    <ColorPalette handleChange={this.handleChange} selectedColor={selectedColor} />
                </div>
            </Popover >
        )

    }
}

