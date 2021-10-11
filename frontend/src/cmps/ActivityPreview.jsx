import React, { Component } from 'react'
import { utilService } from '../services/util.service';

export class ActivityPreview extends Component {
    state = {}

    get activityToShow() {
        let { activity, currTask } = this.props
        if (!currTask) currTask = activity.task
        if (activity.txt && activity.txt.length > 20) activity.txt = activity.txt.substr(1, 12) + '...'
        switch (activity.type) {
            case 'due-date-complete':
                return 'marked the due date complete'
            case 'due-date-incomplete':
                return 'marked the due date incomplete'
            case 'set-date':
                return `set the due date to of ${currTask.title} to ${activity.txt}`
            case 'remove-date':
                return `removed the due date from ${currTask.title}`
            case 'add-checklist':
                return `added Checklist to ${currTask.title}`
            case 'remove-checklist':
                return `removed Checklist from ${currTask.title}`
            case 'add-member':
                return `added ${activity.txt} to ${currTask.title}`
            case 'remove-member':
                return `removed ${activity.txt} from ${currTask.title}`
            case 'add-self':
                return `joined task ${currTask.title}`
            case 'remove-self':
                return `left task ${currTask.title}`
            case 'add-to-archive':
                return `archived ${currTask.title}`
            case 'remove-from-archive':
                return `returned ${currTask.title} to board `
            case 'remove-task':
                return `deleted ${currTask.title} from board`
            case 'complete-todo':
                return `completed ${activity.txt} on ${currTask.title}`
            case 'incomplete-todo':
                return `marked ${activity.txt} incomplete on ${currTask.title}`
            case 'remove-attachment':
                return `deleted the ${activity.txt} attachment from ${currTask.title}`
            case 'change-title':
                return `changed task title to ${activity.txt} `
            default:
                return ''
        }
    }


    render() {
        const { activity, isShowActivities, selectNotification } = this.props
        const { byMember } = activity
        if ((!isShowActivities && activity.type !== 'comment') || (!byMember)) return <></>
        return (
            <div className={`activity-preview-container flex ${activity.isNotRead ? 'unread' : ''} ${activity.isNotify ? 'notify' : ''}`}
                onClick={activity.isNotify ? () => { selectNotification(activity) } : undefined}>
                <article className="member-wrapper">
                    {byMember?.imgUrl ? (
                        <img
                            src={byMember.imgUrl}
                            className="member-img"
                            alt={byMember.fullname[0].toUpperCase()}
                        />
                    ) :
                        (
                            <div className="member-img" style={{ background: 'rgb(223, 225, 230)', color: 'inherit' }}>
                                <p className={`member-letter preview`}>{byMember?.fullname?.[0] || ''}</p>
                            </div>
                        )}
                </article>

                {activity.type === 'comment' &&
                    <div className="comment-preview">
                        <div className="comment-by-user">
                            <span className="member-name">{byMember.fullname}</span>
                            <span className="comment-created-at">{utilService.timeSince(activity.createdAt)}</span>
                        </div>
                        <div className="comment-content">
                            <p className="comment-txt">{activity.txt}</p>
                        </div>
                    </div>
                }
                {activity.type !== 'comment' &&
                    <div className="activity-preview">
                        <div className="activity-by-user">
                            <span className="member-name">{byMember.fullname}</span>
                            <span className="activity-content">{this.activityToShow}</span>
                        </div>
                        <div className="activity-created-at-container">
                            <span className="activity-created-at">{utilService.timeSince(activity.createdAt)}</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}