import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

export function PopoverLabelPreview({ label, labelsId, toggleLabelCheck, toggleIsEditCreate, setLabelEdit }) {
    return (
        <li className="flex" key={label.id} onClick={() => { toggleLabelCheck(label.id) }}>
            <div className="label-popover-preview flex" style={{ backgroundColor: label.color }}>
                <span>{label.title}</span>
                {labelsId.length > 0 && labelsId.includes(label.id) &&
                    <span style={{ lineHeight: '1rem' }}>
                        <CheckIcon style={{ width: '16px', height: '16px' }} />
                    </span>
                }
            </div>
            <div className="flex align-center justify-center">
                <EditIcon style={{ width: '16px', height: '16px', color: '#42526e' }}
                    onClick={(event) => { event.stopPropagation(); toggleIsEditCreate(); setLabelEdit(label) }} />
            </div>
        </li >
    )
}

