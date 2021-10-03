import React from 'react'
import VideoLabel from '@mui/icons-material/VideoLabel';
import { connect } from 'react-redux';
import { setPosition, togglePopover } from '../store/app.actions';


export function _TaskCardCover({ setPosition, currTaskDetails, togglePopover }) {
    const { bgColor, bgUrl } = currTaskDetails.style
    return (
        <div className="card-cover flex" style={{ backgroundColor: bgColor ? bgColor : '' }}>
            {bgUrl && <img src={bgUrl} style={{ backgroundColor: bgColor ? bgColor : '' }} />}
            <button className="cover-btn flex" onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'COVER' }); togglePopover() }}><VideoLabel /> Cover</button>
        </div >
    )
}

function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
    };
}
const mapDispatchToProps = {
    setPosition,
    togglePopover
};

export const TaskCardCover = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TaskCardCover);
