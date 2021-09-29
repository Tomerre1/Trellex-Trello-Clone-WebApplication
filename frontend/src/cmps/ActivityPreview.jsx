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
        return Math.floor(seconds) + " seconds ago";
    }

    render() {
        const { activity } = this.props
        const { byMember } = activity
        console.log('activity', activity)
        return (
            <div className="activity-preview flex">
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



            </div>
        )
    }
}