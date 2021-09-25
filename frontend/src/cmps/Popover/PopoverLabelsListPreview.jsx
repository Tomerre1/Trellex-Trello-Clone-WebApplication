import React from 'react'
import { PopoverLabelPreview } from './PopoverLabelPreview'

export function PopoverLabelsListPreview({ labelIds, labels, handleChange, toggleIsCreate, toggleLabelCheck, search, setLabelEdit, toggleIsEditCreate }) {
    return (
        <div className="popover-labels">
            <input type="search" placeholder="Search Labels" onChange={handleChange} value={search} />
            <h4>LABELS</h4>
            <ul className="clean-list">
                {labels && labels.filter(label => label.title.toLowerCase().includes(search.toLowerCase()))
                    .map(label =>
                        <PopoverLabelPreview
                            key={label.id}
                            label={label}
                            labelsId={labelIds}
                            toggleLabelCheck={toggleLabelCheck}
                            toggleIsEditCreate={toggleIsEditCreate}
                            setLabelEdit={setLabelEdit}
                            toggleIsCreate={toggleIsCreate}

                        />
                    )}
            </ul>
            <button className="secondary-btn" onClick={toggleIsEditCreate}>Create a new label</button>
        </div>
    )
}

