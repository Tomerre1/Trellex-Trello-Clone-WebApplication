import React from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { ColorPalette } from '../ColorPalette'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { PopoverLabelPreview } from './PopoverLabelPreview'
import { PopoverMemberPreview } from './PopoverMemberPreview'
import { setPosition } from '../../store/app.actions'
import { loadBoard, setFilterBy } from '../../store/board.actions'



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
        const { loadBoard, board, setFilterBy } = this.props
        const { value, name } = event.target
        this.setState(prevState => ({
            ...prevState,
            filterBy: { ...prevState.filterBy, [name]: value }
        }), () => {
            setFilterBy(this.state.filterBy)
            loadBoard(board._id, this.state.filterBy)
        })
    }



    toggleLabelCheck = (labelId) => {
        const { board, loadBoard, setFilterBy } = this.props
        const { filterBy } = this.state
        const labels = filterBy.labels.includes(labelId) ? filterBy.labels.filter(id => id !== labelId) : [...filterBy.labels, labelId]
        this.setState(prevState => ({
            ...prevState,
            filterBy: { ...prevState.filterBy, labels }
        }), () => {
            setFilterBy(this.state.filterBy)
            loadBoard(board._id, this.state.filterBy)
        })
    }

    toggleMemberCheck = (memberId) => {
        const { board, loadBoard, setFilterBy } = this.props
        const { filterBy } = this.state
        const members = filterBy.members.includes(memberId) ? filterBy.members.filter(id => id !== memberId) : [...filterBy.members, memberId]
        this.setState(prevState => ({
            ...prevState,
            filterBy: { ...prevState.filterBy, members }
        }), () => {
            setFilterBy(this.state.filterBy)
            loadBoard(board._id, this.state.filterBy)
        })
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
                    {board.members.map(member => <PopoverMemberPreview key={member.id} member={member} selectedMembersIds={filterBy.members} isFilter={true} toggleMemberCheck={this.toggleMemberCheck} />)}
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
    loadBoard,
    setFilterBy
};

export const PopoverMenuSearchCard = connect(mapStateToProps, mapDispatchToProps)(_PopoverMenuSearchCard)
