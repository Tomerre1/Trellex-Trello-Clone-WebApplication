import React from 'react'
import { PopoverLabelPreview } from './PopoverLabelPreview'

export function PopoverLabelsListPreview({ labelIds, labels, handleChange, toggleLabelCheck, search, toggleIsEdit }) {
    return (
        <div className="popover-labels">
            <input type="search" placeholder="Search Labels" onChange={handleChange} value={search} />
            <h4>LABELS</h4>
            <ul className="clean-list">
                {labels.filter(label => label.title.toLowerCase().includes(search.toLowerCase()))
                    .map(label =>
                        <PopoverLabelPreview
                            key={label.id}
                            label={label}
                            labelsId={labelIds}
                            toggleLabelCheck={toggleLabelCheck}
                            toggleIsEdit={toggleIsEdit}
                        />
                    )}
            </ul>
            <button className="secondary-btn">Create a new label</button>
        </div>
    )
}

