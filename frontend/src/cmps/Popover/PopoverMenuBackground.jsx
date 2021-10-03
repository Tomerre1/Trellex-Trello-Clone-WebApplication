import React from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { ColorPalette } from '../ColorPalette'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { setPosition } from '../../store/app.actions'
import { saveBoard } from '../../store/board.actions'



class _PopoverMenuBackground extends React.Component {
    static
    state = {

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

    render() {
        const { board, title, setPosition } = this.props
        if (!board) return <></>

        return <div className="board-menu">
            <Popover title={title}>
                <span
                    class="back"
                    onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'BOARD_SHOW_MENU' }) }}>
                    <ArrowBackIosIcon />
                </span>
                <div class="pop-over-background">
                    <div class="background-styles-container">
                        <h4>Colors</h4>
                        <ColorPalette selectedColor={board.style.bgClr} isGradient={true} handleChange={this.handleChange} />
                        <h4>Images</h4>
                        <ColorPalette selectedColor={board.style.bgClr} isImages={true} handleChange={this.handleChange} />

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
