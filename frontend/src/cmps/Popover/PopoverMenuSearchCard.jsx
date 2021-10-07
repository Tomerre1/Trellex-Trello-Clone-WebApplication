import React from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { ColorPalette } from '../ColorPalette'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { PopoverLabelPreview } from './PopoverLabelPreview'
import { setPosition } from '../../store/app.actions'
import { loadBoard } from '../../store/board.actions'



class _PopoverMenuSearchCard extends React.Component {
    state = {
        filterBy: {
            search: '',
            labels: [],
            members: []
        }
    }

    componentDidMount() {
        const { filterBy } = this.props
        this.setState({
            filterBy: {
                search: '',
                labels: [],
                members: []
            }
        })
    }




    handleSearch = (event) => {
        const { loadBoard, board } = this.props
        const { filterBy } = this.state
        const { value, name } = event.target
        this.setState(prevState => ({
            ...prevState,
            filterBy: { ...prevState.filterBy, [name]: value }
        }), () => { loadBoard(board._id, this.state.filterBy) })



    }



    toggleLabelCheck = (labelId) => {
        const { board, loadBoard } = this.props
        const { filterBy } = this.state
        const labels = filterBy.labels.includes(labelId) ? filterBy.labels.filter(id => id !== labelId) : [...filterBy.labels, labelId]
        this.setState(prevState => ({
            ...prevState,
            filterBy: { ...prevState.filterBy, labels }
        }), () => { loadBoard(board._id, this.state.filterBy) })
    }



    render() {
        const { board, title, setPosition } = this.props
        if (!board) return <></>
        const { search, filterBy } = this.state

        return <div className="board-menu">
            <Popover title={title}>
                <span
                    class="back"
                    onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'BOARD_SHOW_MENU' }) }}>
                    <ArrowBackIosIcon />
                </span>
                <div className="popover-filter">
                    <p>Search by task title</p>
                    <input type="search" value={search} name="search" onChange={this.handleSearch} placeholder="Enter task title" autoFocus />
                    <hr />
                    <p>Filter by task labels</p>
                    {board.labels.map(label => <PopoverLabelPreview key={label.id} label={label} labelsId={filterBy.labels} isFilter={true} toggleLabelCheck={this.toggleLabelCheck} />)}
                    <hr />
                </div>
            </Popover>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        filterBy: state.boardModule.filterBy
    }
}
const mapDispatchToProps = {
    setPosition,
    loadBoard
};

export const PopoverMenuSearchCard = connect(mapStateToProps, mapDispatchToProps)(_PopoverMenuSearchCard)
