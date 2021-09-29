import React, { Component } from 'react';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { AddComment } from './AddComment'
import { ActivitiesList } from './ActivitiesList'


export class TaskActivities extends Component {


    state = {
        isShowActivities: false
    }

    onToggleComments = () => {
        this.setState({ isShowActivities: !this.state.isShowActivities })
    }

    getTaskCommentsAndActivitiesSorted = () => {
        const { currTask, activities } = this.props
        let CommAndAct = []

        if (currTask.comments && currTask.comments.length) {
            CommAndAct.push(...currTask.comments)
        }

        if (activities && activities.length) {
            activities.forEach((activity) => {
                if (activity.task.id === currTask.id) CommAndAct.push(activity)
            })
        }
        if (!CommAndAct.length) return null
        CommAndAct.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))
        return CommAndAct
    }


    render() {
        const { isShowActivities } = this.state
        const { currTask, loggedinUser, activities } = this.props
        // console.log('currTask', currTask)
        // console.log('currTask.comments', currTask.comments)
        // console.log('activities', activities)
        const CommAndAct = this.getTaskCommentsAndActivitiesSorted()

        return (
            <div className="task-activities flex column">
                <div className="window-modal-title flex space-between">
                    <div className="task-activities-header flex align-center">
                        <FormatListBulletedIcon />
                        <h3>Activity</h3>
                    </div>
                    <button className="activity-toggle-btn" onClick={this.onToggleComments}>
                        {isShowActivities ? 'Show details' : 'Hide details'}
                    </button>
                </div>
                <AddComment currTask={currTask} loggedinUser={loggedinUser} />
                {CommAndAct && CommAndAct.length && <ActivitiesList CommAndAct={CommAndAct} isShowActivities={isShowActivities} />}
                {/* {!!this.cardActivities.length && <ActivitiesList activities={this.cardActivities} isGeneral={false} />} */}
            </div>
        )
    }

}