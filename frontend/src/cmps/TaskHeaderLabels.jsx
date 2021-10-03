import { connect } from 'react-redux';
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { setPosition, togglePopover } from '../store/app.actions';


export function _TaskHeaderLabels({ currTaskDetails, board, setPosition, togglePopover }) {
    const labels = board.labels.filter((label) => currTaskDetails.labelIds.includes(label.id))
    if (labels.length === 0) return <></>
    return (
        <div className="task-details-header-labels item-container flex column">
            <h3 className="task-details-header-title">Labels</h3>
            <div className="labels-container flex wrap">
                {labels.map(label => {
                    return <span
                        onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'LABELS' }); togglePopover(); }}
                        key={label.id} className="label" style={{ backgroundColor: label.color }}>
                        {label.title}
                    </span>
                })}
                <button className="secondary-btn" onClick={(event) => { setPosition({ pos: { pageX: event.pageX, pageY: event.pageY }, type: 'LABELS' }); togglePopover(); }}><AddIcon /></button>
            </div>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        currTaskDetails: state.appModule.currTaskDetails,
        board: state.boardModule.board,
    };
}
const mapDispatchToProps = {
    setPosition,
    togglePopover
};

export const TaskHeaderLabels = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TaskHeaderLabels);
