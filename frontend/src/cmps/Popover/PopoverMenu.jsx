import { Component } from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { ActivitiesList } from "../ActivitiesList"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { setPosition } from '../../store/app.actions'



class _PopoverMenu extends Component {
    state = {

    }

    render() {
        const { board } = this.props
        console.log('board', board)
        const { togglePopover, currentTarget, title, setPosition } = this.props
        const CommAndAct = board.activities
        CommAndAct.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))

        return <div className="board-menu">
            <Popover title={title}>
                <div className="menu-details ">
                    <ul className="clean-list menu-list">
                        <li onClick={(ev) => this.onOpenPopover(ev, 'BACKGROUND')}>
                            <span className="menu-bg-span" style={{ background: board.style.bgClr }}></span>
                            <span className="menu-title">Change background</span>
                        </li>
                        <li>
                            <SearchIcon />
                            <span className="menu-title">Search cards</span>
                        </li>
                        <li onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'BOARD_SHOW_ARCHIVE' }); }}>
                            <RestoreFromTrashIcon />
                            <span className="menu-title" >Archive</span>
                        </li>
                    </ul>
                    <div className="task-activities-header flex align-center">
                        <FormatListBulletedIcon />
                        <h3 className="menu-activity">Activity</h3>
                    </div>
                    <ActivitiesList CommAndAct={CommAndAct} isShowActivities={true} currTask={null} />

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
    setPosition,
}


export const PopoverMenu = connect(mapStateToProps, mapDispatchToProps)(_PopoverMenu)

{/* <ActivitiesList CommAndAct={CommAndAct} isShowActivities={isShowActivities} currTask={currTask}/> */ }