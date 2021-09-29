import React, { Component } from 'react';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { AddComment } from './AddComment'


export class TaskActivities extends Component {


    state = {
        isShowComments : false
    }

    onToggleComments = () => {
        this.setState({ isShowComments: !this.state.isShowComments })
    }


    render() {
        const { isShowComments } = this.state
        const { currTask , loggedinUser} = this.props
        return (
            <div className="task-activities flex column">
                <div className="window-modal-title flex space-between">
                    <div className="task-activities-header flex align-center">
                        <FormatListBulletedIcon />
                        <h3>Activity</h3>
                    </div>
                    <button className="activity-toggle-btn" onClick={this.onToggleComments}>
                        {isShowComments ? 'Show details' : 'Hide details'}
                    </button>
                </div>
                <AddComment currTask={currTask} loggedinUser={loggedinUser}/>
                {/* {!!this.cardActivities.length && <ActivitiesList activities={this.cardActivities} isGeneral={false} />} */}
            </div>
        )
    }

}