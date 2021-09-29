import React, { Component } from 'react'

export class ActivityPreview extends Component {
    state = {}

    timeSince = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " Years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " Months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " Days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " Hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " Minutes ago";
        }
        return Math.floor(seconds) + " Seconds ago";
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
                            <span className="comment-txt">{activity.txt}</span>
                        </div>
                    </div>
                }



            </div>
        )
    }
}