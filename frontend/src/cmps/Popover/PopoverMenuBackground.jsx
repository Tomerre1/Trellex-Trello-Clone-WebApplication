import React from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { ColorPalette } from '../ColorPalette'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { setPosition } from '../../store/app.actions'
import { saveBoard } from '../../store/board.actions'

class _PopoverMenuBackground extends React.Component {
    state = {
        search: ''
    }

    handleChange = (event) => {
        const { board, saveBoard } = this.props
        const { value } = event.target
        if (value.includes('http' || 'https')) {
            board.style.bgImg = value
            board.style.bgClr = null
        }
        else {
            board.style.bgClr = value
            board.style.bgImg = null
        }
        saveBoard(board)
    }

    handleSearch = (event) => {
        const { value } = event.target
        this.setState(prevState => ({
            ...prevState,
            search: value
        }))

    }

    render() {
        const { board, title, setPosition } = this.props
        if (!board) return <></>
        const { search } = this.state

        return <div className="board-menu">
            <Popover title={title}>
                <span
                    className="back"
                    onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'BOARD_SHOW_MENU' }) }}>
                    <ArrowBackIosIcon />
                </span>
                <div className="pop-over-background">
                    <div className="background-styles-container">
                        <h4>Colors</h4>
                        <ColorPalette selectedColor={board.style.bgClr} isGradient={true} handleChange={this.handleChange} />
                        <h4>Images</h4>
                        <input type="search" value={search} name="search" onChange={this.handleSearch} />
                        <ColorPalette selectedColor={board.style.bgClr} isImages={true} search={search} handleSearch={this.handleSearch} handleChange={this.handleChange} />

                    </div>
                </div>
            </Popover>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}
const mapDispatchToProps = {
    saveBoard,
    setPosition
};

export const PopoverMenuBackground = connect(mapStateToProps, mapDispatchToProps)(_PopoverMenuBackground)
