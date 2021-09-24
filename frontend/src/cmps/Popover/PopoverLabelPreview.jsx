import React from 'react'

export function PopoverLabelPreview({ label }) {
    return (
        <li className="flex" key={label.id} >
            <div className="label-popover-preview flex" style={{ backgroundColor: label.color }}>{label.title}</div>
        </li>
    )
}

