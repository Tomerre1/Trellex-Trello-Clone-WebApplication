import React from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { ColorPalette } from '../ColorPalette'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { PopoverLabelPreview } from './PopoverLabelPreview'
import { setPosition } from '../../store/app.actions'



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
        }, () => {
        })
    }
    handleSearch = (event) => {
        const { value, name } = event.target
        this.setState(prevState => ({
            ...prevState,
            filterBy: { ...prevState.filterBy, [name]: value }
        }))
    }



    render() {
        const { board, title, setPosition } = this.props
        if (!board) return <></>
        const { search } = this.state

        return <div className="board-menu">
            <Popover title={title}>
                <span
                    class="back"
                    onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'BOARD_SHOW_MENU' }) }}>
                    <ArrowBackIosIcon />
                </span>
                <div className="popover-filter">
                    <input type="search" value={search} onChange={this.handleSearch} autoFocus />
                    <p>Search by term, label, member, or due time</p>
                    <hr />
                    {board.labels.map(label => <PopoverLabelPreview key={label.id} label={label} isFilter={true} />)}
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
    setPosition
};

export const PopoverMenuSearchCard = connect(mapStateToProps, mapDispatchToProps)(_PopoverMenuSearchCard)
