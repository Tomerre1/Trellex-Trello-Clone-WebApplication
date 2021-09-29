import React, { Component } from 'react'

export class ActivityPreview extends Component {
    state = {}

    render() {
        const { activity } = this.props
        const {byMember} = activity
        console.log('activity',activity)
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



            </div>
        )
    }
}