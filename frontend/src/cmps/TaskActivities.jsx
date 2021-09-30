import React, { Component } from 'react';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { AddComment } from './AddComment'
import { ActivitiesList } from './ActivitiesList'

import { utilService } from '../services/util.service'

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

    addComment = (txt, byMember) => {
        const { currTask } = this.props
        if (!currTask.comments) currTask.comments = []
        const comment = {
            id: utilService.makeId(),
            txt,
            createdAt: Date.now(),
            type: 'comment',
            byMember
        }
        currTask.comments.push(comment)
        this.props.updateTaskDetails(currTask)
    }


    render() {
        const { isShowActivities } = this.state
        const { currTask, loggedinUser } = this.props
        const CommAndAct = this.getTaskCommentsAndActivitiesSorted()

        return (
            <div className="task-activities flex column">
                <div className="window-modal-title flex space-between">
                    <div className="task-activities-header flex align-center">
                        <FormatListBulletedIcon />
                        <h3>Activity</h3>
                    </div>
                    <button className="activity-toggle-btn" onClick={this.onToggleComments}>
                        {isShowActivities ? 'Hide details' : 'Show details'}
                    </button>
                </div>
                <AddComment currTask={currTask} loggedinUser={loggedinUser} addComment={this.addComment} />
                {CommAndAct && CommAndAct.length && <ActivitiesList CommAndAct={CommAndAct} isShowActivities={isShowActivities} />}
            </div>
        )
    }

}