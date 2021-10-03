import React from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { ColorPalette } from '../ColorPalette'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { } from '../../store/app.actions'
import { saveBoard } from '../../store/board.actions'



class _PopoverMenuBackground extends React.Component {
    static
    state = {

    }

    handleChange = (event) => {
        const { board, saveBoard } = this.props
        const { value } = event.target
        board.style.bgClr = value
        saveBoard(board)
    }

    render() {
        const { board, title } = this.props

        return <div className="board-menu">
            <Popover title={title}>
                <div class="pop-over-background">
                    <span class="back"><ArrowBackIosIcon /></span>
                    <div class="background-styles-container">
                        <ColorPalette selectedColor={board.style.bgClr} handleChange={this.handleChange} />

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
    saveBoard
};

export const PopoverMenuBackground = connect(mapStateToProps, mapDispatchToProps)(_PopoverMenuBackground)
