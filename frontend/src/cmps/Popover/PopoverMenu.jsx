import { Component } from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
// import { ActivitiesList } from "../ActivitiesList"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';



class _PopoverMenu extends Component {

    render() {
        const { board } = this.props
        const { togglePopover, currentTarget, title } = this.props

        return <div className="board-menu">
            <Popover togglePopover={togglePopover} currentTarget={currentTarget} title={title}>
                <div className="menu-details ">
                    <div className="task-activities-header flex align-center">
                        <FormatListBulletedIcon />
                        <h3>Activity</h3>
                    </div>
                    {/* <ActivitiesList activities={board.activities}  /> */}
                   
                </div>
            </Popover>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
}


export const PopoverMenu = connect(mapStateToProps, mapDispatchToProps)(_PopoverMenu)