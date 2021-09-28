import React from 'react'
import AddIcon from '@mui/icons-material/Add';

export function TaskHeaderDate({ selectedDate, setCurrentTarget }) {
    if (selectedDate.length === 0) return <></>
    return (
        <div className="task-details-header-date item-container flex column">
            <h3 className="task-details-header-title">DUE DATE</h3>
            <div className="date-container flex wrap">
                <span 
                onClick={(event) => { setCurrentTarget(event, 'DATE'); }}>Oct 2 at 5:41 PM</span>
                {/* {selectedLabels.map(label => {
                    return <span
                        onClick={(event) => { setCurrentTarget(event, 'LABELS'); }}
                        key={label.id} className="label" style={{ backgroundColor: label.color }}>
                        {label.title}
                    </span>
                })} */}
            </div>
        </div>
    )
}


