import React, { Component } from 'react';

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export class TaskChecklistPreview extends Component {


    state = {
    }



    render() {
        const { checklist } = this.props
        console.log('checklist', checklist)
        return (
            <div className="task-activities flex column">
                <div className="window-modal-title flex space-between">
                    <div className="task-activities-header flex align-center">
                        <CheckBoxOutlinedIcon />
                        <h3>{checklist.title}</h3>
                    </div>
                </div>
            </div>
        )
    }

}