import React from 'react'
import AddIcon from '@mui/icons-material/Add';

export function TaskHeaderLabels({ selectedLabels, setCurrentTarget }) {
    if (selectedLabels.length === 0) return <></>
    return (
        <div className="task-details-header-labels item-container flex column">
            <h3 className="task-details-header-title">Labels</h3>
            <div className="labels-container flex wrap">
                {selectedLabels.map(label => {
                    return <span
                        onClick={(event) => { setCurrentTarget(event, 'LABELS'); }}
                        key={label.id} className="label" style={{ backgroundColor: label.color }}>
                        {label.title}
                    </span>
                })}
                <button className="secondary-btn" onClick={(event) => { setCurrentTarget(event, 'LABELS'); }}><AddIcon /></button>
            </div>
        </div>
    )
}


