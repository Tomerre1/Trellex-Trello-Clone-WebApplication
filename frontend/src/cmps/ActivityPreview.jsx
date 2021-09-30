import React, { Component } from 'react'

export class ActivityPreview extends Component {
    state = {}

    timeSince = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            if (Math.floor(interval) === 1) return "a year ago";
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            if (Math.floor(interval) === 1) return "a month ago";
            return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            if (Math.floor(interval) === 1) return "a day ago";
            return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            if (Math.floor(interval) === 1) return "an hour ago";
            return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            if (Math.floor(interval) === 1) return "an minute ago";
            return Math.floor(interval) + " minutes ago";
        }
        if (Math.floor(seconds) === 0) return "a few seconds ago";
        return Math.floor(seconds) + " seconds ago";
    }

    get activityToShow() {
        const { activity, currTask } = this.props
        switch (activity.type) {
            case 'due-date-complete':
                return 'marked the due date complete'
                break;
            case 'add-checklist':
                return `added Checklist to ${currTask.title}`
                break;
            default:
                break;
        }
    }


    render() {
        const { activity, isShowActivities } = this.props
        const { byMember } = activity
        console.log('activity', activity)
        if (!isShowActivities && activity.type !== 'comment') return <></>
        return (
            <div className="activity-preview-container flex">
                <article className="member-wrapper">
                    {byMember?.imgUrl ? (
                        <img
                            src={byMember.imgUrl}
                            className="member-img"
                            alt={"member-img"}
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
                            <span className="comment-created-at">{this.timeSince(activity.createdAt)}</span>
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
                            <span className="activity-created-at">{this.timeSince(activity.createdAt)}</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}