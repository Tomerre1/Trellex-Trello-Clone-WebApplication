import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';


export function PopoverLabelPreview({ label, labelsId, toggleLabelCheck, toggleIsEdit }) {

    return (
        <li className="flex" key={label.id} onClick={() => { toggleLabelCheck(label.id) }}>
            <div className="label-popover-preview flex" style={{ backgroundColor: label.color }}>
                <span>{label.title}</span>
                {labelsId.includes(label.id) &&
                    <span style={{ lineHeight: '1rem' }}>
                        <CheckIcon key={label.id} style={{ width: '16px', height: '16px' }} />
                    </span>
                }
            </div>
            <div className="flex align-center justify-center">
                <EditIcon style={{ width: '16px', height: '16px', color: '#42526e' }}
                    onClick={toggleIsEdit} />
            </div>
        </li >
    )
}

