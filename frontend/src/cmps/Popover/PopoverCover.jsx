import React from 'react'
import { ColorPalette } from '../ColorPalette'
import { Popover } from './Popover'

export class PopoverCover extends React.Component {

    state = {
        isHeaderSelected: false,
        isFullSelected: false,
        selectedColor: null
    }


    componentDidMount() {
        const { currTask } = this.props
        switch (currTask.style.coverMode) {
            case 'header':
                this.setState(prevState => ({
                    ...prevState,
                    isHeaderSelected: true,
                    selectedColor: currTask.style.bgColor
                }))
                break;
            case 'full':
                this.setState(prevState => ({
                    ...prevState,
                    isFullSelected: true,
                    selectedColor: currTask.style.bgColor
                }))
                break;
            default:
                this.setState(prevState => ({
                    ...prevState,
                    selectedColor: 'rgba(94, 108, 132, 0.3)'
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
        const { updateTaskDetails, currTask } = this.props
        this.setState(prevState => ({
            ...prevState,
            isFullSelected: false,
            isHeaderSelected: false,
        }))
        delete currTask.style.coverMode
        updateTaskDetails(currTask)
    }

    handleChange = (event) => {
        const { updateTaskDetails, currTask } = this.props
        const { value } = event.target
        this.setState({
            selectedColor: value
        })
        currTask.style.bgColor = value
        updateTaskDetails(currTask)
    }


    // bgColor: "#60bd4f"
    // bgImgUrl: ""
    // coverMode: "header"



    render() {
        console.log(this.state.isFullSelected, this.state.isHeaderSelected)
        console.log('%c  this.state.isFullSelected, this.state.isHeaderSelected:', 'color: #0e93e0;background: #aaefe5;', this.state.isFullSelected, this.state.isHeaderSelected);
        const { isHeaderSelected, isFullSelected, selectedColor } = this.state
        console.log(`this.props`, this.props)
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
                        <button className="secondary-btn full">Remove Cover</button>
                    </div>
                    <h4>COLOR</h4>
                    <ColorPalette handleChange={this.handleChange} selectedColor={selectedColor} />
                </div>
            </Popover >
        )

    }
}

