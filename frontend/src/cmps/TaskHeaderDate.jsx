import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export function TaskHeaderDate({ selectedDate, setCurrentTarget }) {
    if (selectedDate.length === 0) return <></>
    return (
        <div className="task-details-header-date item-container flex column">
            <h3 className="task-details-header-title">DUE DATE</h3>
            <div className="date-container flex wrap">
                <button>
                <span 
                className="date-context"
                onClick={(event) => { setCurrentTarget(event, 'DATE'); }}>Oct 2 at 5:41 PM</span>
                <span className="drop-down-icon"><ArrowDropDownIcon/></span>
                </button>
            </div>
        </div>
    )
}


