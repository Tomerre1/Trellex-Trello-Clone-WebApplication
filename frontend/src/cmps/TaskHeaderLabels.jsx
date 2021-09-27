import React from 'react'
import AddIcon from '@mui/icons-material/Add';

export function TaskHeaderLabels({ selectedLabels }) {
    if (selectedLabels.length === 0) return <></>
    return (
        <div className="task-details-header-labels item-container flex column">
            <h3 className="task-details-header-title">Labels</h3>
            <div className="labels-container flex wrap">
                {selectedLabels.map(label => {
                    return <span
                        key={label.id} className="label" style={{ backgroundColor: label.color }}>
                        {label.title}
                    </span>
                })}
                <button className="secondary-btn"><AddIcon /></button>
            </div>
        </div>
    )
}


