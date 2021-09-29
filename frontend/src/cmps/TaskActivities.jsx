import React, { Component } from 'react';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { AddComment } from './AddComment'
import { ActivitiesList } from './ActivitiesList'


export class TaskActivities extends Component {


    state = {
        isShowComments: false
    }

    onToggleComments = () => {
        this.setState({ isShowComments: !this.state.isShowComments })
    }


    render() {
        const { isShowComments } = this.state
        const { currTask, loggedinUser, activities } = this.props
        console.log('currTask', currTask)
        console.log('currTask.comments', currTask.comments)
        console.log('activities', activities)
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
                <AddComment currTask={currTask} loggedinUser={loggedinUser} />
                {(currTask.comments && currTask.comments.length) || (activities && activities.length) &&
                    <ActivitiesList comments={currTask.comments} activities={activities} />}
                {/* {!!this.cardActivities.length && <ActivitiesList activities={this.cardActivities} isGeneral={false} />} */}
            </div>
        )
    }

}